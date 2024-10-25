//import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export async function makePOSTRequest
    (setLoading, endpoint, data, resourceName,
        reset) {
    try {
        setLoading(true);
        const baseUrl = "http://localhost:3000";
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(response)
        if (response.ok) {
            console.log(response);
            setLoading(false);
            toast.success(`New ${resourceName} created Successfully`);
            reset();
        } else {
            // Basically this error is for 
            // transfer stock<the current 
            // stock in ware house 
            //api/adjustments/transfer/routes.js on Post you will get 409
            setLoading(false)
            if (response.status === 409) {
                toast.error("The Giving Warehouse Stock is not enough")
            } else {
                toast.error("Something went wrong");
            }
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}
export async function makePUTRequest
    (setLoading, endpoint, data, resourceName, redirect, reset) {
    try {

        setLoading(true);
        const baseUrl = "http://localhost:3000";
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log(response);
            setLoading(false);
            toast.success(` ${resourceName} Updated Successfully`);

            redirect()
        } else {
            setLoading(false)
            toast.error("Something went wrong");
        }
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}



export async function makeDELETERequest(setLoading, endpoint, resourceName, reset) {
    try {
        setLoading(true);
        const baseUrl = "http://localhost:3000"; // Ensure this is your correct base URL
        const response = await fetch(`${baseUrl}/${endpoint}`, {
            method: "DELETE",  // Correct HTTP method for delete
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            toast.success(`The ${resourceName} deleted successfully`);
            reset();
        } else {
            setLoading(false);
            if (response.status === 409) {
                toast.error("The Giving Warehouse Stock is not enough");
            } else {
                toast.error("Something went wrong");
            }
        }
    } catch (error) {
        setLoading(false);
        console.error(error);
        toast.error("An error occurred while trying to delete the data");
    } finally {
        setLoading(false);
    }
}


