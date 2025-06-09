"use client";

import { useFilters } from "@/hooks/useFilters";
import { Button, Select, SelectItem, Slider, Spinner } from "@heroui/react";

export default function Filters() {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    filters,
    isPending,
    totalCount
  } = useFilters();

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="flex gap-2 items-center">
          <div className="text-secondary font-semibold text-xl">
            Results: {isPending ? <Spinner size='sm' color='secondary' /> : totalCount}
            </div>
          
        </div>

        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size="sm"
              isIconOnly
              color={filters.gender.includes(value) ? "secondary" : "default"}
              onPress={() => selectGender(value)}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            aria-label="slider for age selection"
            label="Age range"
            color="secondary"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={filters.ageRange}
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>
        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
            selectedKeys={new Set([filters.orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

//* ***     Version 1 without useFilters Hook   ***
/**
 "use client";

import { Button, Select, SelectItem, Slider, Selection } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FaFemale, FaMale } from "react-icons/fa";

export default function Filters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genders = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const selectedGender = searchParams.get('gender')?.split(',') || ['male', 'female'];

  const handleAgeSelect = (value: number[]) => {
    const params = new URLSearchParams(searchParams); // /members?gender=male, so gender=male
    params.set("ageRange", value.join(",")); // if value is [25, 35], sets ageRange=25,35
    router.replace(`${pathname}?${params}`); // navigates to /members?gender=male&ageRange=25%2C35 without page reload
  };

  const handleOrderSelect = (value: Selection) => {
    // Check if the passed value is a Set (used by some UI libraries for selection)
    if (value instanceof Set) {
      // Create a new URLSearchParams object from the existing search parameters
      const params = new URLSearchParams(searchParams);
      // Get the first value from the Set and set it as the "orderBy" parameter
      params.set("orderBy", value.values().next().value as string);
      // Update the URL in the browser without a full page reload
      router.replace(`${pathname}?${params}`);
    }
  };

  const handleGenderSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
if(selectedGender.includes(value)) {
  params.set('gender', selectedGender.filter(g => g !== value).toString())
} else {
  params.set('gender', [...selectedGender, value].toString())
}
router.replace(`${pathname}?${params}`);
  };

  if (pathname !== "/members") return null;

  return (
    <div className="shadow-md py-2">
      <div className="flex flex-row justify-around items-center">
        <div className="text-secondary font-semibold text-xl">Results: 10</div>
        <div className="flex gap-2 items-center">
          <div>Gender:</div>
          {genders.map(({ icon: Icon, value }) => (
            <Button 
            key={value} 
            size="sm" 
            isIconOnly
             color={selectedGender.includes(value) ? 'secondary' : 'default'}
             onPress={() => handleGenderSelect(value)}
             >
              <Icon size={24} />
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 w-1/4">
          <Slider
            aria-label="slider for age selection"
            label="Age range"
            color="secondary"
            size="sm"
            minValue={18}
            maxValue={100}
            defaultValue={[18, 100]}
            onChangeEnd={(value) => handleAgeSelect(value as number[])}
          />
        </div>
        <div className="w-1/4">
          <Select
            size="sm"
            fullWidth
            label="Order by"
            variant="bordered"
            color="secondary"
            aria-label="Order by selector"
            selectedKeys={new Set([searchParams.get("orderBy") || "updated"])}
            onSelectionChange={handleOrderSelect}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

 */
