import "./Select.css";
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import React from "react";

export let latitude;
export let longitude;

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      types: ["(cities)"],
    },
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    console.log(address);
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    latitude = lat;
    longitude = lng;
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect} style={{ background: "transparent" }}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className={`select ${status === "OK" ? "select-on" : ""}`}
        placeholder="Digite o nome da cidade"
      />
      <ComboboxPopover className="suggest-container">
        <ComboboxList className="suggest-list">
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption
                key={place_id}
                value={description}
                className="suggest"
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default PlacesAutocomplete;
