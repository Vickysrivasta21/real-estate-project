"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Propertypage = () => {
  const [data, setdata] = useState([]);
  const [tempdata, settempdata] = useState([]);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    let data = async () => {
      let property = await fetch("http://localhost:5000/api/properties");
      let res = await property.json();
      setdata(res);
      settempdata(res);
    };
    data();
  }, []);

  const { register, handleSubmit } = useForm();

  const findprice = (amount, total) => {
    if (total === "LAKH" || total === "Lakh") {
      return amount * 100000;
    } else if (total === "CRORE" || total === "Crore") {
      return amount * 10000000;
    }
  };

  const onSubmit = (d) => {
    d.parking = d.parking === "true" ? true : false;
    let p = d.price.split(" ");
    let price = p[1];
    let setprice = findprice(+price, p[2]);
    let numprice = setprice;

    const filtered = data.filter((ele) => {
      let eleprice = ele.price.split(" ");
      let seteleprice = findprice(+eleprice[0].replace("₹", ""), eleprice[1]);

      return (
        (d.type === "" || d.type === ele.type) &&
        (d.bedrooms === "" || +d.bedrooms === ele.bedrooms) &&
        (+d.bathrooms === ele.bathrooms || d.bathrooms === "") &&
        (d.parking === ele.parking || d.parking === "") &&
        ((p[0] === "BELOW" && seteleprice <= numprice) ||
          (p[0] === "ABOVE" && seteleprice > numprice))
      );
    });

    settempdata(filtered);
    if (sortOption) handleSort(sortOption, filtered);
  };

  const handleSort = (value, baseData = tempdata) => {
    setSortOption(value);
    const sorted = [...baseData].sort((a, b) => {
      if (value === "price") {
        const parse = (str) => {
          const [amount, unit] = str.replace("₹", "").split(" ");
          return findprice(+amount, unit);
        };
        return parse(a.price) - parse(b.price);
      } else if (value === "type") {
        const order = { "1BHK": 1, "2BHK": 2, "3BHK": 3, "4BHK": 4 };
        return order[a.type] - order[b.type];
      } else if (value === "area") {
        return parseInt(a.size) - parseInt(b.size);
      } else if (value === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
    settempdata(sorted);
  };

  return (
    <div className="contholder">
      <div className="filterside">
        <form action="submit" onSubmit={handleSubmit(onSubmit)}>
          <div className="selecttype">
            <label>Choose the type of property : </label>
            <select {...register("type")}>
              <option value="">All</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
            </select>
          </div>

          <div className="selectprice">
            <label>Enter the Price Range : </label>
            <select {...register("price")}>
              <option value="BELOW 20 LAKH">BELOW 20 LAKH</option>
              <option value="BELOW 40 LAKH">BELOW 40 LAKH</option>
              <option value="BELOW 60 LAKH">BELOW 60 LAKH</option>
              <option value="BELOW 1 CRORE">BELOW 1 CRORE</option>
              <option value="ABOVE 1 CRORE">ABOVE 1 CRORE</option>
            </select>
          </div>

          <div className="selectbedrooms">
            <label>Select the number of Bedrooms : </label>
            <select {...register("bedrooms")}>
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="selectbathroom">
            <label>Select the number of Bathrooms : </label>
            <select {...register("bathrooms")}>
              <option value="">All</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="selectparking">
            <label>Parking ?</label>
            <div className="park1">
              <label>
                Yes
                <input
                  type="radio"
                  name="parking"
                  value={true}
                  {...register("parking")}
                />
              </label>
            </div>
            <div className="park2">
              <label>
                No
                <input
                  type="radio"
                  name="parking"
                  value={false}
                  {...register("parking")}
                />
              </label>
            </div>
          </div>

          <div className="selectsort">
            <label>Sort By: </label>
            <select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="price">Price (Low to High)</option>
              <option value="type">Type (1BHK to 4BHK)</option>
              <option value="area">Area (Low to High)</option>
              <option value="rating">Rating (High to Low)</option>
            </select>
          </div>

          <div className="selectbuttonsubmit">
            <button type="submit">Apply Filters</button>
          </div>
        </form>
      </div>

      <div className="maincont">
        {tempdata.length === 0 ? (
          <div className="no-results">
            <h2>OOPS!!..No properties match your filters....</h2>
          </div>
        ) : (
          tempdata.map((ele) => {
            return (
              <div key={ele._id} className="container">
                <div className="content">
                  <div className="image">
                    <Image
                      src={ele.image}
                      width={250}
                      height={250}
                      alt="Property image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div className="type-price">
                    <div className="type">{ele.type}</div>
                    <div className="price">{ele.price}</div>
                  </div>

                  <div className="title">
                    <h1>{ele.title}</h1>
                  </div>

                  <div className="location">location : {ele.location}</div>

                  <div className="features">
                    <div className="size">{ele.size}</div>
                    <div className="beds">
                      total bedrooms : {ele.bedrooms}
                    </div>
                    <div className="bath">
                      total bathroom : {ele.bathrooms}
                    </div>
                    <div className="parking">
                      {ele.parking ? "available" : "not available"}
                    </div>
                  </div>

                  <div className="contact">
                    <div className="view">
                      <Link target="_blank" href={`/propertydetail/${ele._id}`}>
                        view details
                      </Link>
                    </div>
                    <div className="agent">
                      <Link href="/">contact agent</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Propertypage;
