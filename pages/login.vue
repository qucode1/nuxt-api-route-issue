<script setup lang="ts">
import { Ref } from "vue";
interface LoginData {
    password: string;
    username: string;
}

const loginData = reactive<LoginData>({ username: "test@test.de", password: "Test123!" });
const { username, password } = toRefs(loginData);

const isRegisterMode = useState<Boolean>("isRegisterMode", () => false);
const isResetPasswordMode = useState<Boolean>("isResetPasswordMode", () => false);

const loading = ref(false);

const router = useRouter();

const toggleRegisterMode = () => {
    isRegisterMode.value = !isRegisterMode.value;
    isResetPasswordMode.value = false;
};

const toggleResetPasswordMode = () => {
    isResetPasswordMode.value = !isResetPasswordMode.value;
    isRegisterMode.value = false;
};
const login = async (username: Ref<string>, password: Ref<string>) => {
    try {
        const user = await useFetch("/api/login", {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
            },
            initialCache: false,
        });
        if (user.error.value) {
            throw new Error(`Login Failed: ${user.error.value}`);
        }
        navigateTo(router.currentRoute.value?.query?.redirect?.toString() || "/");
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const register = async (username: Ref<string>, password: Ref<string>) => {
    try {
        const res = await useFetch("/api/register", {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
            },
            initialCache: false,
        });
        if (res.error.value) {
            throw new Error(`Login Failed: ${res.error.value}`);
        }
        console.log({ user: res });
    } catch (error) {
        console.error("register error", { error });
        throw new Error(error);
    }
};

const resetPassword = async (username: Ref<string>) => {
    try {
        const res = await useFetch("/api/reset-password", {
            method: "POST",
            body: {
                username: username.value,
            },
            initialCache: false,
        });
        if (res.error.value) {
            throw new Error(`resetPassword failed: ${res.error.value}`);
        }
    } catch (error) {
        console.error("resetPassword error", { error });
        throw new Error(error);
    }
};

const onSubmit = async () => {
    try {
        loading.value = true;
        if (isResetPasswordMode.value) {
            await resetPassword(username);
        } else if (isRegisterMode.value) {
            await register(username, password);
            loading.value = false;
        } else {
            await login(username, password);
        }
    } catch (error) {
        loading.value = false;
    }
};
</script>

<template>
    <div>
        <NuxtLayout>
            <p v-if="loading">Loading...</p>
            <form class="flex flex-col gap-4" v-else>
                <div class="flex gap-1 items-center">
                    <label for="username"> Username </label>
                    <input
                        id="username"
                        v-model="loginData.username"
                        class="bg-gray-200 p-0.5"
                        type="text"
                        placeholder="Username"
                    />
                </div>
                <div v-if="!isResetPasswordMode" class="flex gap-1 items-center">
                    <label for="password"> Password </label>
                    <input
                        id="password"
                        v-model="loginData.password"
                        class="bg-gray-200 p-0.5"
                        type="password"
                        placeholder="******************"
                    />
                </div>
                <div class="flex gap-6">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white p-2 transition-colors"
                        type="submit"
                        @click.prevent="onSubmit"
                    >
                        {{
                            isResetPasswordMode
                                ? "Reset Password"
                                : isRegisterMode
                                ? "Complete Registration"
                                : "Sign In"
                        }}
                    </button>
                    <button
                        class="text-blue-500 hover:text-blue-700 p-0.5 transition-colors"
                        type="button"
                        @click="toggleRegisterMode"
                    >
                        {{ isRegisterMode ? "Login" : "Register" }}
                    </button>
                    <button
                        v-if="!isResetPasswordMode"
                        class="hover:text-blue-700 p-0.5 transition-colors"
                        type="button"
                        @click="toggleResetPasswordMode"
                    >
                        Reset Passwort
                    </button>
                </div>
            </form>
        </NuxtLayout>
    </div>
</template>
