import { useContext } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import StateContext from "../../store/context/state-context";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteMealHttp } from "../../lib/http/DeleteMealHttp";
import { AddMealHttp } from "../../lib/http/AddMealHttp";
import { UpdateMealHttp } from "../../lib/http/UpdateMealHttp";
import { fetchMeals, queryClient } from "../../lib/http/FetchMealsHttp";

const useMealManager = () => {
  const navigate = useNavigate();

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
  const contextValue = useContext(StateContext) as { isRestaurant: string };
  const { isRestaurant } = contextValue;

  const {
    data: filteredMealsData,
    isLoading: filteredMealsLoading,
    isError: filteredMealsIsError,
    error: filteredMealsError,
  } = useQuery({
    queryKey: ["meals", { cuisine: isRestaurant }],
    queryFn: ({ signal }) => fetchMeals({ signal, isRestaurant }),
    enabled: !!isRestaurant, // the isLoading will not be true if this query is just disabled
  });

  // Fetch Meals Depending On Restaurant Name:
  const { restaurant } = useParams();

  const {
    data: allRestaurantMealsData,
    isPending: allRestaurantMealsPending,
    isError: allRestaurantMealsIsError,
    error: allRestaurantMealsError,
  } = useQuery({
    queryKey: ["meals", { restaurant }],
    queryFn: () => fetchMeals({ restaurant }),
    staleTime: 5000,
    enabled: !!restaurant,
  });

  // Fetch Meals Depending On Meal's Id:
  const { id } = useParams();

  const {
    data: mealData,
    isPending: mealDataPending,
    isError: mealDataIsError,
    error: mealDataError,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: ({ signal }) => fetchMeals({ signal, id: id }),
    enabled: !!id,
  });

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
      navigate(`/dashboard/${restaurant}`);
    },
  });

  // Update Meal:
  const {
    mutate: updateMealMutation,
    isPending: updateMealIsPending,
    isError: updateMealIsError,
    error: updateMealError,
  } = useMutation({
    mutationKey: ["meals", id],
    mutationFn: UpdateMealHttp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meals"], exact: true });
      navigate(`/dashboard/${restaurant}`);
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
