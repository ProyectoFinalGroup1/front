// components/Calendario.js
const Calendario = () => {
    return (
      <div style={{ position: 'relative', paddingBottom: '100%', height: 0, overflow: 'hidden' }}>
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3lJaUVyMuZ8fLnmTgti-_V7xH4KJcCw0rCE_85M2omAZ4gM6zmfHjSwKYFPOf8Xx2K9Br6y4Hs?gv=true"
          style={{
            border: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    );
  };
  
  export default Calendario;
  

  