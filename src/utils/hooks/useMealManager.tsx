import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchMeals } from "../../lib/http";
import StateContext from "../../store/context/state-context";
import { useParams } from "react-router-dom";

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
  };
};

export default useMealManager;
