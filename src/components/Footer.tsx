import React from "react";

const Footer = () => {
    return (
        <div className="text-white mt-10">
            <div className="flex justify-between">
                <div className="text-2xl justify-end flex">
                    <i className="fa-brands fa-instagram mr-5"></i>
                    <i className="fa-brands fa-facebook mr-5"></i>
                    <i className="fa-brands fa-twitter mr-5"></i>
                    <i className="fa-brands fa-google"></i>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-5 text-xs text-slate-300 mt-10">
                    <p>Privacy policy</p>
                    <p>Term of service</p>
                    <p>Language</p>
                </div>
                <div className="flex gap-5 text-xs text-slate-300 mt-10">2024</div>
            </div>
        </div>
    );
};

export default Footer;
