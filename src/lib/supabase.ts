import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
export async function checkAndCreateUser(user: any) {
    if (!user || !user.id || !user.email) {
      console.error("Invalid user data:", user);
      return null;
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
        return existingUser;
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
        return userByEmail;
      }
  
      // El usuario no existe, procedemos a crearlo con upsert
      console.log("User not found, creating new user...");
  
      const newUser = {
        idUser: user.id,
        email: user.email || "",
        nombre: user.user_metadata?.nombre || user.user_metadata?.name || "",
        apellido: user.user_metadata?.apellido || user.user_metadata?.family_name || "",
        dni: generateDNI(),
        isAdmin: false,
        password: generateRandomPassword(),
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
          return finalCheck;
        }
        
        throw upsertError;
      }
  
      console.log("User created/updated successfully:", upsertResult);
      return upsertResult;
    } catch (error) {
      console.error("Error in checkAndCreateUser:", error);
      throw error;
    }
  }