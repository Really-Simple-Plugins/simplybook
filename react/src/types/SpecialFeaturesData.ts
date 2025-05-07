export default interface SpecialFeaturesData {
    isPluginActive: (id: string) => boolean;
    refetchData: () => void;
    plugins: any[];
    hasError: boolean;
    isLoading: boolean;
    data: Array<Object>;
}