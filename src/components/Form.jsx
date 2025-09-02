
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Form.css";

const initialState = {
  spa_name: "",
  city: "",
  area: "",
  price: "",
  timing: "",
  images: [],
  imageURLs: [],
};



const Form = () => {

    const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: files, imageURLs: fileUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("spa_name", formData.spa_name);
    payload.append("city", formData.city);
    payload.append("area", formData.area);
    payload.append("price", formData.price);
    payload.append("timing", formData.timing.length === 8 ? formData.timing : formData.timing + ":00");
    formData.images.forEach((img) => payload.append("images", img));
    await fetch("http://20.193.149.47:2242/spas/vendor-spa-update-test/1/", {
      method: "POST",
      body: payload,
    });
    setFormData(initialState);
  };

  return (
    <div className="app-container">
      <section className="form-section">
        <h2>Vendor Spa Update</h2>
        <form onSubmit={handleSubmit}>
          <label>Spa Name</label>
          <input
            type="text"
            name="spa_name"
            placeholder="The Spa"
            value={formData.spa_name}
            onChange={handleChange}
            required
          />
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Ahmedabad"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <label>Area</label>
          <input
            type="text"
            name="area"
            placeholder="sindhubhavan-road"
            value={formData.area}
            onChange={handleChange}
            required
          />
          <label>Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImages} />
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="1800"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label>Timing</label>
          <input
            type="time"
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </section>
      <section className="preview-section">
        <div className="preview-card">
          <h3>{formData.spa_name || "The Spa"}</h3>
          <div className="preview-area">
            <span>
              {formData.area || "sindhubhavan-road"},{" "}
              {formData.city || "Ahmedabad"}
            </span>
          </div>
          <div className="preview-row">
            <span className="price">
              ₹{formData.price || "1800"} Onwards
            </span>
            <span className="open-time">
              Opens {formData.timing || "11:00:00"}
            </span>
          </div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="preview-swiper"
            style={{ marginTop: 16, borderRadius: "8px" }}
          >
            {formData.imageURLs.length
              ? formData.imageURLs.map((url, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={url}
                      alt={`spa_${i}`}
                      style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </SwiperSlide>
                ))
              : (
                <SwiperSlide>
                  <div className="no-image">No images</div>
                </SwiperSlide>
              )}
          </Swiper>
          <div className="preview-footer">
            <span className="rating">
              <span className="tick">✓</span> 4.48 (15 reviews)
            </span>
            <span className="more-photos">more photos</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Form