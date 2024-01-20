import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./flightInquiry.module.css";
import Calendar from "../../components/calendar/Calendar";
import Dropdown, { DropdownReturn } from "../../components/dropdown/Dropdown";
import {
  faChevronRight,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import Passenger from "../../components/passenger/Passenger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FlightApiInsideData } from "../../api/FlightApi";
import { arrayOfObjectToSet } from "../../utils/CommonUtils";
import Dialog from "../../components/dialog/Dialog";
import { FARE_CATEGORIES, ROUTE_PATHS } from "../../utils/Constants";

export interface FlightInquiryState {
  from: { key: string; value: string } | null;
  to: { key: string; value: string } | null;
  passengerCount: number;
  type: FARE_CATEGORIES;
}

const FlightInquiry = () => {
  const [flightInformation, setFlightInformation] =
    useState<FlightInquiryState>({
      from: null,
      to: null,
      passengerCount: 1,
      type: FARE_CATEGORIES.economy,
    });
  const { data } = useLoaderData() as FlightApiInsideData;
  const [fromData, setFromData] = useState<{ key: string; value: string }[]>(
    []
  );
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [toData, setToData] = useState<{ key: string; value: string }[]>([]);
  useEffect(() => {
    let localFrom: { key: string; value: string }[] = [];
    let localTo: { key: string; value: string }[] = [];
    localStorage.setItem("flightData", JSON.stringify(data));
    data.forEach((item) => {
      localFrom.push({
        key: item.originAirport.city.code,
        value: item.originAirport.city.name,
      });
      localFrom.push({
        key: item.destinationAirport.city.code,
        value: item.destinationAirport.city.name,
      });
      /*Yapılmaması gereken bir şey ama JSON’da yer almayan kalkış ve varış noktaları denendiğinde uçuş listeleme sayfasının açılmaması ve hata
      modal gösterimi beklenmektedir.Maddesi için yapılıyor */
      localTo.push({
        key: item.originAirport.city.code,
        value: item.originAirport.city.name,
      });
      localTo.push({
        key: item.destinationAirport.city.code,
        value: item.destinationAirport.city.name,
      });
    });
    setFromData(
      arrayOfObjectToSet(localFrom) as { key: string; value: string }[]
    );
    setToData(arrayOfObjectToSet(localTo) as { key: string; value: string }[]);
  }, [data]);

  const onChangeDropdownHandler = (event: DropdownReturn) => {
    const { name, value } = event;

    setFlightInformation((prevState) => ({
      ...prevState,
      [name]: { ...value },
    }));
  };

  const onChangeHandler = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target as HTMLInputElement;
    if (name === "passengerCount") {
      const { valueAsNumber } = event.target as HTMLInputElement;

      setFlightInformation((prevState) => ({
        ...prevState,
        [name]: valueAsNumber,
      }));
    } else {
      const { value } = event.target as HTMLInputElement;

      setFlightInformation((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const validateAndContinue = () => {
    if (!flightInformation.to?.key || !flightInformation.from?.key) {
      setErrorMessage("Lütfen uçuşunuz için varış ve kalkış noktası seçiniz.");
      setDialogOpen(true);
      return;
    }
    if (flightInformation.to?.key === flightInformation.from?.key) {
      setErrorMessage(
        "Kalkış ve varış noktaları birbirinden farklı olmalıdır. Lütfen seçtiğiniz uçuş noktalarından birini değiştirin. "
      );
      setDialogOpen(true);
      return;
    }
    const valid = data.some(
      (flightData) =>
        flightData.originAirport.code === flightInformation.from?.key &&
        flightData.destinationAirport.code === flightInformation.to?.key
    );
    if (valid) {
      localStorage.setItem(
        "flightInformation",
        JSON.stringify(flightInformation)
      );
      navigate(ROUTE_PATHS.FLIGHTLISTING);
    } else {
      setErrorMessage("Uygun uçuş bulunamadı");
      setDialogOpen(true);
    }
  };

  return (
    <section className={style.container}>
      <div className={style.sectionHeader}>
        <p>Merhaba</p>
        <p>Nereyi keşfetmek istersiniz?</p>
      </div>
      <div className={style.bookingContainer}>
        <Dropdown
          placeholder="Nereden"
          icon={faPlaneDeparture}
          value={flightInformation.from?.value}
          onChange={onChangeDropdownHandler}
          options={fromData}
          name="from"
        />
        <Dropdown
          placeholder="Nereye"
          value={flightInformation.to?.value}
          icon={faPlaneArrival}
          onChange={onChangeDropdownHandler}
          options={toData}
          name="to"
        />
        <Calendar />
        <Passenger
          count={flightInformation.passengerCount}
          type={flightInformation.type}
          onChange={onChangeHandler}
          typeName="type"
          countName="passengerCount"
        />
        <div className={style.buttonContainer}>
          <FontAwesomeIcon
            color="#E81932"
            size="4x"
            icon={faChevronRight}
            onClick={validateAndContinue}
          />
        </div>
      </div>
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        content={errorMessage}
      />
    </section>
  );
};

export default FlightInquiry;
