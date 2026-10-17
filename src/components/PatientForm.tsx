import { useState } from "react";
import type { Lang, Patient, PatientDraft } from "../types";
import {
  adlLabels,
  diagnosisLabels,
  employmentLabels,
  familyLabels,
  insuranceLabels,
  ui,
  type Text,
} from "../i18n";

interface Props {
  patient: PatientDraft;
  lang: Lang;
  onChange: (patient: PatientDraft) => void;
  onCheck: () => void;
}

export const emptyPatient: PatientDraft = {
  age: "",
  insurance: "",
  employment: "",
  diagnosis: "",
  family: "",
  adl: "",
};

export function toPatient(draft: PatientDraft): Patient | null {
  if (
    draft.age === "" ||
    Number.isNaN(draft.age) ||
    draft.insurance === "" ||
    draft.employment === "" ||
    draft.diagnosis === "" ||
    draft.family === "" ||
    draft.adl === ""
  ) {
    return null;
  }
  return {
    age: draft.age,
    insurance: draft.insurance,
    employment: draft.employment,
    diagnosis: draft.diagnosis,
    family: draft.family,
    adl: draft.adl,
  };
}

function optionsFor<K extends string>(labels: Record<K, Text>, lang: Lang) {
  return (Object.keys(labels) as K[]).map((key) => (
    <option key={key} value={key}>
      {labels[key][lang]}
    </option>
  ));
}

export default function PatientForm({
  patient,
  lang,
  onChange,
  onCheck,
}: Props) {
  const [showError, setShowError] = useState(false);

  const update = <K extends keyof PatientDraft>(
    field: K,
    value: PatientDraft[K],
  ) => {
    onChange({ ...patient, [field]: value });
    setShowError(false);
  };

  const handleCheck = () => {
    if (!toPatient(patient)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onCheck();
  };

  return (
    <div className="form">
      <h2>{ui.formTitle[lang]}</h2>
      <label>
        <span>{ui.age[lang]}</span>
        <input
          type="number"
          min={20}
          max={110}
          value={patient.age}
          onChange={(e) =>
            update("age", e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </label>
      <label>
        <span>{ui.insurance[lang]}</span>
        <select
          className={patient.insurance === "" ? "is-placeholder" : undefined}
          value={patient.insurance}
          onChange={(e) =>
            update("insurance", e.target.value as PatientDraft["insurance"])
          }
        >
          <option value="">{ui.pleaseSelect[lang]}</option>
          {optionsFor(insuranceLabels, lang)}
        </select>
      </label>
      <label>
        <span>{ui.employment[lang]}</span>
        <select
          className={patient.employment === "" ? "is-placeholder" : undefined}
          value={patient.employment}
          onChange={(e) =>
            update("employment", e.target.value as PatientDraft["employment"])
          }
        >
          <option value="">{ui.pleaseSelect[lang]}</option>
          {optionsFor(employmentLabels, lang)}
        </select>
      </label>
      <label>
        <span>{ui.diagnosis[lang]}</span>
        <select
          className={patient.diagnosis === "" ? "is-placeholder" : undefined}
          value={patient.diagnosis}
          onChange={(e) =>
            update("diagnosis", e.target.value as PatientDraft["diagnosis"])
          }
        >
          <option value="">{ui.pleaseSelect[lang]}</option>
          {optionsFor(diagnosisLabels, lang)}
        </select>
      </label>
      <label>
        <span>{ui.family[lang]}</span>
        <select
          className={patient.family === "" ? "is-placeholder" : undefined}
          value={patient.family}
          onChange={(e) =>
            update("family", e.target.value as PatientDraft["family"])
          }
        >
          <option value="">{ui.pleaseSelect[lang]}</option>
          {optionsFor(familyLabels, lang)}
        </select>
      </label>
      <label>
        <span>{ui.adl[lang]}</span>
        <select
          className={patient.adl === "" ? "is-placeholder" : undefined}
          value={patient.adl}
          onChange={(e) => update("adl", e.target.value as PatientDraft["adl"])}
        >
          <option value="">{ui.pleaseSelect[lang]}</option>
          {optionsFor(adlLabels, lang)}
        </select>
      </label>
      <button className="primary" onClick={handleCheck}>
        {ui.check[lang]}
      </button>
      {showError ? <p className="form-error">{ui.formIncomplete[lang]}</p> : null}
    </div>
  );
}
