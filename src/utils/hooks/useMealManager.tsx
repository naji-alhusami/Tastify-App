import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../../lib/http";
import { useContext } from "react";
import StateContext from "../../store/context/state-context";

const useMealManager = () => {
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


  // 
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

  return {
    allMealsData,
    allMealsPending,
    allMealsIsError,
    allMealsError,
    filteredMealsData,
    filteredMealsLoading,
    filteredMealsIsError,
    filteredMealsError,
  };
};

export default useMealManager;
