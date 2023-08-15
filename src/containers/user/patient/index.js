import React from "react";

function PatientPatient() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title text-center text-primary text-uppercase">
            Room Booking
          </h6>
          <h1 className="mb-5">
            Book A{" "}
            <span className="text-primary text-uppercase">Luxury Room</span>
          </h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.1s"
                  src="img/about-1.jpg"
                  style={{ marginTop: "25%" }}
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-100 wow zoomIn"
                  data-wow-delay="0.3s"
                  src="img/about-2.jpg"
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid rounded w-50 wow zoomIn"
                  data-wow-delay="0.5s"
                  src="img/about-3.jpg"
                />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid rounded w-75 wow zoomIn"
                  data-wow-delay="0.7s"
                  src="img/about-4.jpg"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="wow fadeInUp" data-wow-delay="0.2s">
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date3"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        id="checkin"
                        placeholder="Check In"
                        data-target="#date3"
                        data-toggle="datetimepicker"
                      />
                      <label htmlFor="checkin">Check In</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className="form-floating date"
                      id="date4"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        id="checkout"
                        placeholder="Check Out"
                        data-target="#date4"
                        data-toggle="datetimepicker"
                      />
                      <label htmlFor="checkout">Check Out</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select1">
                        <option value={1}>Adult 1</option>
                        <option value={2}>Adult 2</option>
                        <option value={3}>Adult 3</option>
                      </select>
                      <label htmlFor="select1">Select Adult</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select className="form-select" id="select2">
                        <option value={1}>Child 1</option>
                        <option value={2}>Child 2</option>
                        <option value={3}>Child 3</option>
                      </select>
                      <label htmlFor="select2">Select Child</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <select className="form-select" id="select3">
                        <option value={1}>Room 1</option>
                        <option value={2}>Room 2</option>
                        <option value={3}>Room 3</option>
                      </select>
                      <label htmlFor="select3">Select A Room</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Special Request"
                        id="message"
                        style={{ height: "100px" }}
                        defaultValue={""}
                      />
                      <label htmlFor="message">Special Request</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPatient;
