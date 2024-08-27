export const environment = {
    production: true,
    firebaseConfig: JSON.parse(process.env["FIREBASE_CONFIG"] as string),
    dropboxConfig: JSON.parse(process.env["DROPBOX_CONFIG"] as string)
};
