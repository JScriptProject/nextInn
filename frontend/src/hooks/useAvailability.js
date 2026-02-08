import { useState, useEffect } from "react";
import { getRoomsAvailability } from "@api/bookingApi.js";

export const useAvailability = (categoryId, checkIn, checkOut) => {
  const [availability, setAvailability] = useState(null);

  // Initialize loading to TRUE only if all inputs are present and valid
  const [loading, setLoading] = useState(
    !!categoryId && !!checkIn && !!checkOut && checkIn !== checkOut
  );

  useEffect(() => {
    // 1. Guard Clause: Missing Data
    if (!categoryId || !checkIn || !checkOut) {
      console.warn("⚠️ Availability Check Skipped: Missing inputs", {
        categoryId,
        checkIn,
        checkOut,
      });
      setLoading(false);
      return;
    }

    // 2. Guard Clause: Invalid Date Range (Start == End)
    if (checkIn === checkOut) {
      setLoading(false);
      return;
    }

    const checkRoomsAvailability = async () => {
      try {
        setLoading(true);
        console.log("🔍 Checking Availability for:", {
          categoryId,
          checkIn,
          checkOut,
        });

        const response = await getRoomsAvailability(
          categoryId,
          checkIn,
          checkOut
        );

        if (response.success) {
          // Your API wrapper returns { data: { availableRooms: X } }
          // So we access response.data.availableRooms
          const count = response.data?.availableRooms ?? 0;
          setAvailability(count);
          console.log("✅ Availability Updated:", count);
        } else {
          console.error("❌ API Error:", response.message);
        }
      } catch (error) {
        console.error("❌ Availability Check Failed:", error);
        setAvailability(null);
      } finally {
        setLoading(false);
      }
    };

    // 3. Debounce Logic
    const availabilityTimer = setTimeout(() => {
      checkRoomsAvailability();
    }, 500);

    return () => clearTimeout(availabilityTimer);
  }, [categoryId, checkIn, checkOut]);

  return { availability, loading };
};
