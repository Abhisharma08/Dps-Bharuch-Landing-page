declare global {
    interface Window {
        dataLayer: Record<string, any>[];
    }
}

export const pageview = (url: string) => {
    if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
            event: "pageview",
            page: url,
        });
    }
};

type GTMEvent = {
    eventName: string;
    [key: string]: any;
};
  
export const event = ({ eventName, ...rest }: GTMEvent) => {
    if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
            event: eventName,
            ...rest,
        });
    }
};
