
const auth = {
    token: "",

    login: async function login (username, password) {
        const user = {
            email: username,
            password: password,
            api_key: "a658b6a81142e8f9075c70c7b744b441"
        };

        try {
            const response = await fetch("https://auth.emilfolino.se/login", {
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });

            if (response.status === 200) {
                const result = await response.json();

                if (result.data?.type === "success") {
                    auth.token = result.data.token;

                    return "ok";
                }
            }
            if (response.status === 401) {
                const result = await response.json();

                if (result.errors.title === "User not found") {

                    return "user";
                };
                if (result.errors.title === "Wrong password") {

                    return "PW";
                } 
            }

            return "not ok";
        } catch (error) {
            console.error(error);
        }
    },

    register: async function register (username, password) {
        const user = {
            email: username,
            password: password,
            api_key: "a658b6a81142e8f9075c70c7b744b441"
        };

        const response = await fetch("https://auth.emilfolino.se/register", {
            body: JSON.stringify(user),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });

        try {
            const result = await response.json();
            if (result.data.message === "User successfully registered.") {
                return "ok";
            }
            return "not ok";
        } catch {
            return "not ok";
        }
    },
};

export default auth;