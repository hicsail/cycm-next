const Legal = () => {
  return (
    <div className="flex flex-col items-center">
      <hr className="border-gray-800 w-[90%] my-4" />
      <div className="flex mb-16 w-[90%]">
        <h2 className="text-left">© 2023 All rights reserved</h2>
        <div className="ml-auto">
          <a className="mx-5 hover:underline" href="#">
            Privacy Policy
          </a>
          <a className="mx-5 hover:underline" href="#">
            Terms of Service
          </a>
          <a className="mx-5 hover:underline" href="#">
            Cookies Settings
          </a>
        </div>
      </div>
    </div>
  );
};

export default Legal;
