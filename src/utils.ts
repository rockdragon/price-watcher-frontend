export class Utils {
    // get Google map api key
    public static getGoogleMapApiKEY(): string {
        return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
    }


    // get geolocation as Promise
    public static getLocation(): Promise<{
        ok: boolean;
        coords?: GeolocationCoordinates;
        error?: GeolocationPositionError;
    }> {
        return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve({ok: true, coords: pos.coords}),
                (err) => resolve({ok: false, error: err})
            );
        });
    }
}