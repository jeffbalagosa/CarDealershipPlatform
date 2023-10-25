async function markAppointmentsAsVIP(appointments) {
  const updatedAppointments = await Promise.all(
    appointments.map(async (appointment) => {
      const vin = appointment.vin;
      const response = await fetch(
        `http://localhost:8080/api/check_vin/${vin}/`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.exists && data.sold) {
          return { ...appointment, isVIP: true };
        }
      }
      return { ...appointment, isVIP: false };
    })
  );
  return updatedAppointments;
}

export default markAppointmentsAsVIP;
