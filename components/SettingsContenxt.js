import defaultAppSettings from './defaults';
import React from 'react';
export const SettingsContext = React.createContext(defaultAppSettings);


export function SettingsContextProvider({children}) {
    
    const changeSetting = (state, action) => {
        let NewSettings = { ...state};
        NewSettings[action.key] = action.value;
        // console.log(state)
        return NewSettings;
    }

    const [Settings, changeSettings] = React.useReducer(changeSetting, defaultAppSettings)
    
    return (  
        <SettingsContext.Provider value={{Settings: Settings, changeSettings: changeSettings}}>
            {children}
        </SettingsContext.Provider>
        
    );
}

export default SettingsContextProvider;