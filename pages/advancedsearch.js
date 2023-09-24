import ComboBox from "@/components/ComboBox";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Head from "next/head";
import useSWR from "swr";

export default function AdvanceSearch() {
    // Pass Columns into search
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const res_protein_name = useSWR('/api/column?name=protein_name',fetcher)
    const res_protein_source = useSWR('/api/column?name=protein_source',fetcher)
    const res_uniprotid = useSWR('/api/column?name=uniprot_id',fetcher)

    const res_nuc_acid_name = useSWR('/api/column?name=nucleic_acid_name',fetcher)
    const res_type_nuc = useSWR('/api/column?name=type_nuc',fetcher)

    const res_method = useSWR('/api/column?name=method',fetcher)
    // const res_uniprotid = useSWR('/api/column?name=uniprot_id',fetcher)
    // console.log(res_protein_name.data, res_protein_source.data, res_uniprotid.data)
    if((res_protein_name.isLoading && res_protein_name.isLoading && res_protein_name.isLoading)) { return <>Loading</>}
    if((res_protein_name.error && res_protein_name.error && res_protein_name.error)) { return <>Error</>}

    return (
        <>
            <Head>
                <title>ProNuQuery</title>
            </Head>   

            <Header />
            <Container>
            <form method="get" action="/api/processform">
                <div className="space-y-12">

                        {/* Section 1 */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Protein Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                            This section collects information related to the protein involved in the interaction. It typically includes details such as the protein&apos;s name, source organism, length (number of amino acids), if applicable. This information is essential for characterizing the protein's identity and state.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {(res_protein_name.data && res_protein_name.data && res_uniprotid.data) && (
                                        <>
                                        {/* default, combobox, label, isBtnHidden */}
                                        <ComboBox isBtnHidden={true} label={"name"} name={"name"}  className={"col-span-full"} combobox={res_protein_name.data.data} />
                                        <ComboBox isBtnHidden={true} label={"source"} name={"source"}  className={"col-span-full"} combobox={res_protein_source.data.data}/>
                                        <ComboBox isBtnHidden={true} label={"uniprot"} name={"uniprot"}  className={"col-span-full"} combobox={res_uniprotid.data.data} />
                                        {/* <ComboBox  isBtnHidden={true} label={"mutation"}  name={"mutation"} className={"col-span-full"}/> */}
                                        </>
                                )}
                                    
                                    <div className="sm:col-span-2">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Length
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="length_from"
                                            id="length_from"
                                            placeholder="From"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            &nbsp;
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="length_to"
                                            id="length_to"
                                            placeholder="To"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Nucleic Acid</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                            The Nucleic Acid section focuses on gathering details about the nucleic acid component of the interaction. It commonly includes the nucleic acid's name or description, its type (e.g., DNA or RNA). This information helps identify the nature of the genetic material involved.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {(res_nuc_acid_name.data && res_type_nuc.data) && (
                                        <>
                                        {/* default, combobox, label, isBtnHidden */}
                                        <ComboBox isBtnHidden={true} label={"Nucleaic Acid"} name={"nuc_acid"}  className={"col-span-full"} combobox={res_nuc_acid_name.data.data} />
                                        <ComboBox isBtnHidden={true} label={"Type"} name={"type"}  className={"col-span-full"} combobox={res_type_nuc.data.data}/>

                                        </>
                                )}
                                   

                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Experimental Condition</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                            Captures the conditions under which the protein-nucleic acid interaction was studied or measured. Key factors include the pH level, temperature, and the method or technique used for the experiment. These conditions play a significant role in determining the stability and dynamics of the interaction.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {(res_method.data) && (
                                        <>
                                        {/* default, combobox, label, isBtnHidden */}
                                        <ComboBox isBtnHidden={true} label={"Method"} name={"method"}  className={"col-span-full"} combobox={res_method.data.data} />

                                        <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Temperature
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="temp_from"
                                            id="temp_from"
                                            placeholder="From"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            &nbsp;
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="temp_to"
                                            id="temp_to"
                                            placeholder="To"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            pH
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="ph_from"
                                            id="ph_from"
                                            placeholder="From"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            &nbsp;
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="ph_to"
                                            id="ph_to"
                                            placeholder="To"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                        </>
                                )}
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Thermodynamic Parameters</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                            The Thermodynamic Parameters section deals with the quantitative aspects of the interaction. It typically includes values such as the Gibbs free energy change (ΔG), often represented as dG_wild (kcal/mol), which measures the energetics of the interaction. Additionally, it may include information about the change in Gibbs free energy (ΔΔG or ddG) resulting from mutations or alterations in the protein. These parameters provide insights into the thermodynamics of the interaction.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {(res_protein_name.data && res_protein_name.data && res_uniprotid.data) && (
                                        <>
                                        {/* default, combobox, label, isBtnHidden */}

                                        <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            ΔG - dG_wild (kcal/mol)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="dg_wild_from"
                                            id="dg_wild_from"
                                            placeholder="From"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            &nbsp;
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="dg_wild_to"
                                            id="dg_wild_to"
                                            placeholder="To"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        ΔΔG - ddG
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="ddg_from"
                                            id="ddg_from"
                                            placeholder="From"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>


                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            &nbsp;
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            name="ddg_to"
                                            id="ddg_to"
                                            placeholder="To"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:pl-2 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                        </>
                                )}
                            </div>
                        </div>

                        {/* <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                                </select>
                            </div>
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Well always let you know about important changes, but you pick what else you want to hear about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    id="comments"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Comments
                                    </label>
                                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    id="candidates"
                                    name="candidates"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="candidates" className="font-medium text-gray-900">
                                    Candidates
                                    </label>
                                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    id="offers"
                                    name="offers"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="offers" className="font-medium text-gray-900">
                                    Offers
                                    </label>
                                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                </div>
                                </div>
                            </div>
                            </fieldset>
                            <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                <input
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                    Everything
                                </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                <input
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Same as email
                                </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                <input
                                    id="push-nothing"
                                    name="push-notifications"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                    No push notifications
                                </label>
                                </div>
                            </div>
                            </fieldset>
                        </div>
                        </div> */}
                </div>

                    {/* Buttons */}
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Search
                    </button>
                </div>
            </form>

    </Container>

            
        </>
    )
}