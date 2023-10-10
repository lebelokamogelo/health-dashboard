import { Combobox, Transition } from "@headlessui/react"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"

const pages = [
  { name: "dashboard", url: "/" },
  { name: "doctors", url: "doctors" },
  { name: "patients", url: "patients" },
  { name: "appointments", url: "appointments" },
  { name: "calendar", url: "calendar" },
  { name: "settings", url: "settings" },
  { name: "account setting", url: "settings/account" },
]

export default function Search() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const filteredPages =
    query === ""
      ? pages
      : pages.filter((page) =>
          page.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )

  return (
    <div>
      <Combobox>
        <div className="relative mt-1">
          <div className="relative w-96 cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md">
            <Combobox.Input
              className="w-full border-none outline-none p-4 placeholder:text-lg text-sm leading-5 text-gray-900"
              value={query}
              placeholder="Type to search"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base outline-none">
              {filteredPages.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPages.map((page, index) => (
                  <Combobox.Option
                    onClick={() => router.push(`/${page.url}`)}
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 capitalize ${
                        active ? "bg-slate-700 text-white" : "text-gray-900"
                      }`
                    }
                    value={page}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {page.name}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
