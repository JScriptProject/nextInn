export function rateCalculation(
  bookingData,
  roomCapacity,
  addonServicesCharges
) {
  let totalCost = bookingData?.rate * bookingData?.days;

  //optional chaininng the fallback
  const adults = bookingData.adults ?? 0;
  const children = bookingData.children ?? 0;
  const rooms = bookingData.rooms ?? 0;
  const extraBed = bookingData.bed ?? 0;

  const adultCapacity = roomCapacity.adults ?? 0;
  const childCapacity = roomCapacity.children ?? 0;
  const exatraAdultCapacity = roomCapacity.maxExtraAdults ?? 0;
  const exatraChildCapacity = roomCapacity.maxExtraChildren ?? 0;
  const extraBedCapacity = roomCapacity.maxExtraBed ?? 0;
  const extraAdultCharges = roomCapacity.extraAdultCharges ?? 0;
  const extraChildCharges = roomCapacity.extraChildCharges ?? 0;
  const extraBedCharge = roomCapacity.extraBedCharge ?? 0;

  const priceBreakDown = [
    { label: "days", amount: bookingData?.days * bookingData?.rate },
  ];

  if (adults > adultCapacity) {
    const amountAdult = (adults - adultCapacity) * extraAdultCharges;
    totalCost += amountAdult;
    priceBreakDown.push({ label: "adults", amount: amountAdult });
  }
  if (children > childCapacity) {
    const amountChildren = (children - childCapacity) * extraChildCharges;
    totalCost += amountChildren;
    priceBreakDown.push({ label: "children", amount: amountChildren });
  }
  if (rooms > 1) {
    const roomsAmount = (rooms - 1) * (bookingData?.rate * bookingData?.days);
    totalCost += roomsAmount;
    priceBreakDown.push({ label: "rooms", amount: roomsAmount });
  }

  if (extraBed > 0) {
    const extraBedAmount = extraBed * extraBedCharge;
    totalCost += extraBedAmount;
    priceBreakDown.push({ label: "extraBed", amount: extraBedAmount });
  }

  if (bookingData.addonServices.petFriendly) {
    const petFriendlyAmount = addonServicesCharges?.petFriendly;
    totalCost += petFriendlyAmount;
    priceBreakDown.push({ label: "petFriendly", amount: petFriendlyAmount });
  }
  if (bookingData.addonServices.steamRoom) {
    const steamRoomAmount = addonServicesCharges?.steamRoom;
    totalCost += steamRoomAmount;
    priceBreakDown.push({ label: "steamRoom", amount: steamRoomAmount });
  }
  if (bookingData.addonServices.laundry) {
    const laundryAmount =
      addonServicesCharges?.laundry * (adults + children) * bookingData?.days;

    totalCost += laundryAmount;
    priceBreakDown.push({ label: "laundry", amount: laundryAmount });
  }

  return [totalCost, priceBreakDown];
}