 import { FaFacebook, FaGithub, FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

function Footer() {
  return (
    <>
      <div className="bg-[#111111] h-[200px] flex flex-1 flex-col">
        <div className="flex flex-wrap justify-center items-center pt-8 md:gap-5 sm:gap-1.5 gap-1">
            <FaGoogle className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
            <FaTwitter className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
            <FaGithub className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
            <FaFacebook className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
            <FaYoutube className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
            <FaInstagram className="w-10 h-10 p-1 bg-white rounded-full text-[1rem] "/>
        </div>
        <div>
            <ul className="flex flex-wrap text-white md:gap-10 sm:gap-6 gap-2 justify-center mt-8 ">
            <li>Home</li>
            <li>About</li>
            <li>Product</li>
            <li>Contact us</li>
            <li>Service</li>
            
            </ul>
        </div>
      </div>
      <div className="bg-[#000000]  text-white text-xl min-h-[50px] flex justify-center items-center flex-wrap   ">Copyright &#169;2025 designed by <span className="  pl-1.5 hover:text-amber-700 ">Veer</span> </div>
    </>
  )
}

export default Footer
