import { createClient, User as SupabaseAuthUser } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the type for your database user
export interface DbUser {
  phoneNumber: number;
  idUser: string;
  email: string;
  nombre: string;
  apellido: string;
  dni: string | number;
  isAdmin: boolean;
  password: string;
  fechaPago?: string | null;
  imagenUrl?: string | null;
  recibirRecordatoriosAniversarios?: boolean;
}

// Función para generar un DNI aleatorio con formato 00XXXXXX
function generateDNI(): string {
  return `00${Math.floor(100000 + Math.random() * 900000)}`;
}

// Función para generar una contraseña aleatoria más robusta
function generateRandomPassword(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return Array.from(
    { length: 12 },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
}

// Función para verificar si el usuario existe y crearlo si no
export async function checkAndCreateUser(user: SupabaseAuthUser): Promise<DbUser> {
  if (!user || !user.id || !user.email) {
    console.error("Invalid user data:", user);
    throw new Error("Invalid user data provided");
  }

  try {
    // Primero intentamos obtener el usuario
    const { data: existingUser, error: queryError } = await supabase
      .from("user")
      .select("*")
      .eq("idUser", user.id)
      .maybeSingle();

    if (queryError) {
      console.error("Error checking user by ID:", queryError);
      // En lugar de lanzar error, continuamos a la siguiente comprobación
    }

    // Si encontramos el usuario por ID, retornamos
    if (existingUser) {
      console.log("User found by ID:", existingUser);
      return existingUser as DbUser;
    }

    // Si no lo encontramos por ID, buscar por email como respaldo
    const { data: userByEmail, error: emailError } = await supabase
      .from("user")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (emailError) {
      console.error("Error checking user by email:", emailError);
      // Continuamos al siguiente paso
    }

    // Si existe por email, retornamos
    if (userByEmail) {
      console.log("User found by email:", userByEmail);
      return userByEmail as DbUser;
    }

    // El usuario no existe, procedemos a crearlo con upsert
    console.log("User not found, creating new user...");

    // Extract user metadata with type safety
    const metadata = user.user_metadata as { 
      nombre?: string; 
      name?: string; 
      apellido?: string;
      family_name?: string;
    } | null;

    const newUser: DbUser = {
      idUser: user.id,
      email: user.email || "",
      nombre: metadata?.nombre || metadata?.name || "",
      apellido: metadata?.apellido || metadata?.family_name || "",
      dni: generateDNI(),
      isAdmin: false,
      password: generateRandomPassword(),
      phoneNumber: 0 //agregado para build
    };

    // Usar upsert para garantizar que no hay errores de duplicidad
    const { data: upsertResult, error: upsertError } = await supabase
      .from("user")
      .upsert([newUser], {
        onConflict: 'idUser', // o 'email' si prefieres
        ignoreDuplicates: false // actualizar si existe
      })
      .select()
      .maybeSingle();

    if (upsertError) {
      console.error("Error upserting user:", upsertError);
      // Último intento: intentar obtener el usuario una vez más
      const { data: finalCheck } = await supabase
        .from("user")
        .select("*")
        .eq("idUser", user.id)
        .maybeSingle();

      if (finalCheck) {
        console.log("Found user after upsert error:", finalCheck);
        return finalCheck as DbUser;
      }

      throw upsertError;
    }

    console.log("User created/updated successfully:", upsertResult);
    return upsertResult as DbUser;
  } catch (error) {
    console.error("Error in checkAndCreateUser:", error);
    throw error;
  }
}