import React, {
  useImperativeHandle,
  useRef,
  forwardRef,
  useEffect,
  useContext,
  useState,
  
} from "react";
import { X, LogIn } from "lucide-react";
import SummaryData from "@user/components/SummaryData";
import hotelLogo from "@assets/media/logo.png";
import { BookingContext } from "@user/context/BookingContext";
import BookingSuccess from "@user/components/booking-components/BookingSuccess";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { confirmBooking } from "@api/bookingApi";


const PreviewBooking = forwardRef(function PreviewBooking(
  { onClose, isBookingPreviewOpen, prizeBreakDown, totalPrice, payload },
  ref
) {
  const { bookingData } = useContext(BookingContext);
  const [bookingSuccess, setBookingSuccess] = useState({status:false, data:null});
  const previewRef = useRef();
  const location = useLocation();
  const { user } = useSelector((state)=> state.user);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        previewRef.current.showModal();
      },
      close: () => {
        previewRef.current.close();
      },
    };
  }, []);

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
    navigate("/user-dashboard");
  }
  const onConfirmSubmit = async(e) => {
    e.preventDefault();
    console.log("clickeddd")
    const response = await confirmBooking(payload);
    console.log("Confirm Submit Response => ", response);
    setBookingSuccess({status:true,data:response.data});
    setTimeout(() => {
      onClosePopUp();
    }, 3000);
  };


  return (
    <>
      <dialog ref={previewRef} onClose={onClose}>
        <div className="dailog-wrapper">
          {bookingSuccess.status && (
            <BookingSuccess
              onClosePopUp={onClosePopUp}
              formState={bookingSuccess.data}
            />
          )}
          <div className="booking-preview-cta-block">
            <div className="hotel-logo">
              <img src={hotelLogo} alt="hotel Logo" />
            </div>
            <h4>Confirm Your Booking</h4>
            {user ? (
              <div className="guest-details-container">
                {/* Row 1: Name */}
                <div className="guest-detail-row">
                  <span className="guest-label">Name</span>
                  <span className="guest-value">
                    {user.firstname} {user.lastname}
                  </span>
                </div>

                {/* Row 2: Email */}
                <div className="guest-detail-row">
                  <span className="guest-label">Email</span>
                  <span className="guest-value">{user.email}</span>
                </div>

                {/* Row 3: Mobile */}
                <div className="guest-detail-row">
                  <span className="guest-label">Mobile</span>
                  <span className="guest-value">{user.mobile}</span>
                </div>

                {/* Row 4: City */}
                <div className="guest-detail-row">
                  <span className="guest-label">City</span>
                  <span className="guest-value">
                    {user.city || "Not Provided"}
                  </span>
                </div>
                <div className="preview-form-buttons">
                  <form onSubmit={onConfirmSubmit}>
                    <button type="submit" className="confirm-submit-btn">
                      Confirm Booking
                    </button>
                  </form>
                </div>
                <p className="confirm-disclaimer">
                  {" "}
                  <span>📩</span> A booking confirmation will be sent to the
                  email address you provided.
                </p>
              </div>
            ) : (
              /* --- STATE B: USER NOT LOGGED IN --- */
              <div className="login-required-box">
                <div className="login-icon-circle">
                  <LogIn size={24} color="#ea580c" />
                </div>
                <h5>Login Required</h5>
                <p>
                  Please log in to your account to secure your reservation and
                  view booking details.
                </p>

                {/* 2. Link passes 'state' with current location */}
                <Link
                  to="/login"
                  state={{ from: location }}
                  className="confirm-submit-btn login-btn-link"
                >
                  Log In to Continue
                </Link>

                <p className="register-hint">
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            )}
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
