let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aayushkhosla16@gmail.com',
    pass: 'zgsj ovvm glit nsra'
  }
});


function sendCabBookingConfirmation(booking) {

  const mailOptions = {
    from: 'varisharashid01@example.com',
    to: booking.email,
    subject: 'Cab Booking Confirmation',
    text: `Your cab is scheduled with following details:
      Estimated cost: ${booking.bookingPrice} INR
      Estimated time ${booking.estimatedTime} minutes
      Pickup location: ${booking.source}
      Drop location: ${booking.destination}
       `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email error: ' + error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


module.exports = sendCabBookingConfirmation;