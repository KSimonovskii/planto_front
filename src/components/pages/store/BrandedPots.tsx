const BrandedPots = () => {

  return  (
        <section className="bg-white overflow-hidden font-['Rubik']">
            <div className="">
                <div className="bg-white rounded-lg p-6 md:p-8 relative">

                    <h2 className="text-lime-800 text-2xl sm:text-3xl font-bold  leading-tight ">
                        Interested in branded pots?
                    </h2>

                    <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-end">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 px-3 py-2 text-stone-700 placeholder:text-stone-300 font-['Rubik']"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 px-3 py-2 text-stone-700 placeholder:text-stone-300 font-['Rubik']"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="company" className="sr-only">
                                    Company Name
                                </label>
                                <input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 px-3 py-2 text-stone-700 placeholder:text-stone-300 font-['Rubik']"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="Phone"
                                    className="w-full bg-neutral-50 rounded-lg outline outline-1 outline-offset-[-1px] outline-lime-800 px-3 py-2 text-stone-700 placeholder:text-stone-300 font-['Rubik']"
                                />
                            </div>
                        </div>


                    </form>

                </div>
                <div className="md:col-span-2 flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-lime-800 text-white rounded-lg inline-flex justify-center items-center gap-2 text-base hover:bg-lime-600 transition"
                    >
                        Sending
                    </button>
                </div>
            </div>
        </section>
  );
};

export default BrandedPots;