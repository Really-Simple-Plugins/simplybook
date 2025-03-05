import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Route } from "../routes/settings/$settingsId.lazy";

const useSettingsMenu = () => {
  const { settingsId } = Route.useParams();
  // Query for fetching settings from server
  const query = useQuery({
    queryKey: ["settings_menu"],
    queryFn: () => {
      return new Promise((resolve, reject) => {
        // window.simplybook && window.simplybook.settings_menu
        if (window.simplybook && window.simplybook.settings_menu) {
          resolve(window.simplybook.settings_menu);
        }
        reject(new Error("Settings menu not found"));
      });
    },
    initialData: window.simplybook && window.simplybook.settings_menu,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const currentForm =
    query.data.find((section) => section.id === settingsId) || {};

  return {
    menu: query.data,
    currentForm,
    menuIsLoading: query.isLoading,
    menuIsError: query.isError,
  };
};

export default useSettingsMenu;
