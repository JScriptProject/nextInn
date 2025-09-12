import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useContext,
  useState,
  useActionState,
} from "react";
import { X } from "lucide-react";
import SummaryData from "../SummaryData";
import hotelLogo from "../../assets/media/logo.png";
import { BookingContext } from "../../assets/context/BookingContext";
import BookingSuccess from "./BookingSuccess";

const PreviewBooking = forwardRef(function PreviewBooking(
  { onClose, isBookingPreviewOpen, prizeBreakDown, totalPrice },
  ref
) {
  const { bookingData } = useContext(BookingContext);
  const [bookingSeccess, setBookingSuccess] = useState(false);

  const previewRef = useRef();
  console.log("Booking Data", bookingData);
  console.log("PrizeBreakDown", prizeBreakDown);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          previewRef.current.showModal();
        },
        close: () => {
          previewRef.current.close();
        },
      };
    },
    []
  );

  useEffect(() => {
    if (isBookingPreviewOpen) {
      previewRef.current.showModal();
    } else {
      previewRef.current.close();
    }
  }, [isBookingPreviewOpen]);
  const addonServiceData = bookingData.addonServices;
  const addonServicesList = Object.keys(addonServiceData).filter(
    (key) => addonServiceData[key] === true
  );

  function onClosePopUp() {
    setBookingSuccess(false);
    previewRef.current.close();
    onClose();
  }
  const onConfirmSubmit = (prevState,formData) => {
     const name = formData.get("name");
     const email = formData.get("email");
     const phone = formData.get("phone");

     setBookingSuccess(true);
     setTimeout(() => {
      onClosePopUp();
     }, 3000);
    return [
        ...prevState,
        {Name:name,Email:email,Phone:phone}
      ];
  };

  const [formState, actionState] = useActionState(onConfirmSubmit, [])

  console.log(formState)
  return (
    <>
     
      <dialog ref={previewRef} onClose={onClose}>
         
        <div className="dailog-wrapper">
          {bookingSeccess && <BookingSuccess onClosePopUp={onClosePopUp} formState={formState} />}
          <div className="booking-preview-cta-block">
            <div className="hotel-logo">
              <img src={hotelLogo} alt="hotel Logo" />
            </div>
            <h4>Confirm Your Booking</h4>
            <div className="booking-confirm-guest-info">
              <form action={actionState}>
                <div className="preview-form-block">
                  <input type="text" name="name" placeholder="Please Enter Name" required />
                </div>
                <div className="preview-form-block">
                  <input type="number" name="phone" placeholder="Phone Number" maxLength={10} required />
                </div>
                <div className="preview-form-block">
                  <input type="email" name="email" placeholder="Email Id" required />
                </div>
                <div className="preview-form-buttons">
                  <button className="confirm-submit-btn" >
                    Confirm Booking
                  </button>
                </div>
                <p className="confirm-disclaimer">
                  {" "}
                  <span>📩</span> A booking confirmation will be sent to the
                  email address you provided.
                </p>
              </form>
            </div>
          </div>
          <div className="booking-preview">
            <div className="booking-preview-wrapper">
              <button onClick={onClose} className="booking-preview-close-btn">
                <X size={20} className="text-[#6b7280] hover:text-[#111]" />
              </button>

              <h4 className="!pb-[1.5rem]">Booking Summary</h4>
              <div className="preview-block">
                <h3 className="preview-block-title">Booking Duration</h3>
                <ul className="preview-block-details">
                  <SummaryData
                    summaryTitle="Check In Date"
                    summaryValue={bookingData.checkIn}
                  />
                  <SummaryData
                    summaryTitle="Check Out Date"
                    summaryValue={bookingData.checkOut}
                  />
                  <SummaryData
                    summaryTitle="Total Day's Stay"
                    summaryValue={bookingData.days}
                  />
                </ul>
              </div>
              <div className="preview-block">
                <h3 className="preview-block-title">Booking Details</h3>
                <ul className="preview-block-details">
                  <SummaryData
                    summaryTitle="Adults"
                    summaryValue={bookingData.adults}
                  />
                  <SummaryData
                    summaryTitle="Children"
                    summaryValue={bookingData.children}
                  />
                  <SummaryData
                    summaryTitle="Rooms"
                    summaryValue={bookingData.rooms}
                  />
                  <SummaryData
                    summaryTitle="Extra Bed"
                    summaryValue={bookingData.bed}
                  />
                </ul>
              </div>
              <div className="preview-block">
                <h3 className="preview-block-title">Additional Services</h3>
                <ul className="preview-block-details">
                  {addonServicesList.length > 0 ? (
                    addonServicesList.map((service) => (
                      <li key={service}>
                        <h6>{service}</h6>
                        <p>Added</p>
                      </li>
                    ))
                  ) : (
                    <li>
                      <h6>No Addon Services Added</h6>
                    </li>
                  )}
                </ul>
              </div>
              <div className="pricing">
                <h2>Total</h2>
                <h4 style={{ fontFamily: "Roboto" }}>
                  <span>₹</span> {totalPrice}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
});

export default PreviewBooking;
