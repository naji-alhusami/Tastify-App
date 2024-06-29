import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import StateContext from "../../store/context/state-context";
import { DeleteMealHttp } from "../../lib/http/DeleteMealHttp";
import { AddMealHttp } from "../../lib/http/AddMealHttp";
import { UpdateMealHttp } from "../../lib/http/UpdateMealHttp";
import { fetchMeals } from "../../lib/http/FetchMealsHttp";
import { queryClient } from "../../lib/http/AddMealHttp";

const useMealManager = () => {
  // Fetch All Meals:
  const {
    data: allMealsData,
    isPending: allMealsPending,
    isError: allMealsIsError,
    error: allMealsError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: () => fetchMeals({}),
    staleTime: 5000, // this ensure that the data will not be fetched from cache always, but in every 5 sec
    // gcTime:1000 this is the time that talk about how much the data will kept around
  });

  // Fetch Meals Depending On Category:
  const contextValue = useContext(StateContext) as {
    isCuisine: string;
    isRestaurant: string;
    isMealId: string;
    setIsUpdateMealForm: (form: boolean) => void;
    setIsAddMealForm: (form: boolean) => void;
  };
  const { isCuisine } = contextValue;

  const {
    data: filteredMealsData,
    isLoading: filteredMealsLoading,
    isError: filteredMealsIsError,
    error: filteredMealsError,
  } = useQuery({
    queryKey: ["meals", { cuisine: isCuisine }],
    queryFn: ({ signal }) => fetchMeals({ signal, isCuisine }),
    enabled: !!isCuisine, // the isLoading will not be true if this query is just disabled
  });

  // Fetch Meals Depending On Restaurant Name:
  const { isRestaurant } = contextValue;

  const {
    data: allRestaurantMealsData,
    isPending: allRestaurantMealsPending,
    isError: allRestaurantMealsIsError,
    error: allRestaurantMealsError,
    refetch: refetchAllRestaurantMealsData,
  } = useQuery({
    queryKey: ["meals", { isRestaurant }],
    queryFn: () => fetchMeals({ isRestaurant }),
    staleTime: 5000,
    enabled: !!isRestaurant,
  });

  // Fetch Meals Depending On Meal's Id:
  const { isMealId } = contextValue;

  const {
    data: mealData,
    isPending: mealDataPending,
    isError: mealDataIsError,
    error: mealDataError,
  } = useQuery({
    queryKey: ["meals", isMealId],
    queryFn: ({ signal }) => fetchMeals({ signal, id: isMealId }),
    enabled: !!isMealId,
  });

  const { setIsAddMealForm, setIsUpdateMealForm } = contextValue;
  // Add Meal:
  const {
    mutate: addMealMutation,
    isPending: addMealIsPending,
    isError: addMealIsError,
    error: addMealError,
  } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: AddMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      console.log("success in adding");
      refetchAllRestaurantMealsData();
      setIsAddMealForm(false);
    },
  });

  // Update Meal:
  const {
    mutate: updateMealMutation,
    isPending: updateMealIsPending,
    isError: updateMealIsError,
    error: updateMealError,
  } = useMutation({
    mutationKey: ["meals", isMealId],
    mutationFn: UpdateMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      refetchAllRestaurantMealsData();
      setIsUpdateMealForm(false);
    },
  });

  // Delete Meal Using mealId:
  const {
    mutate: deleteMealMutation,
    isPending: deleteMealPending,
    isError: deleteMealIsError,
    error: deleteMealError,
  } = useMutation({
    // mutationKey: ["meals"],
    mutationFn: DeleteMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      refetchAllRestaurantMealsData();
    },
  });

  return {
    allMealsData,
    allMealsPending,
    allMealsIsError,
    allMealsError,
    filteredMealsData,
    filteredMealsLoading,
    filteredMealsIsError,
    filteredMealsError,
    allRestaurantMealsData,
    allRestaurantMealsPending,
    allRestaurantMealsIsError,
    allRestaurantMealsError,
    mealData,
    mealDataPending,
    mealDataIsError,
    mealDataError,
    addMealMutation,
    addMealIsPending,
    addMealIsError,
    addMealError,
    updateMealMutation,
    updateMealIsPending,
    updateMealIsError,
    updateMealError,
    deleteMealMutation,
    deleteMealPending,
    deleteMealIsError,
    deleteMealError,
  };
};

export default useMealManager;
