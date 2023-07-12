<template>
    <div class="registrar_usuario">
        <div class="row">
            <div class="col-md-6 registrar_img">
                <img src="../../assets/img/background-registrar.jpg" alt="imagem inventory">
            </div>
            <div class="col-md-6 registrar_form">
                <div class="form-signin">
                    <form @submit.prevent="submit">
                        <h1 class="h3 mb-3 fw-normal text-center">iNVENTORY</h1>

                        <div class="form-floating">
                            <input type="text" class="form-control" id="floatingInput" placeholder="Digite seu usuario"
                                v-model="username" required>
                            <label for="floatingInput">Usuario</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control" id="floatingPassword" placeholder="Digite sua senha"
                                v-model="password" required>
                            <label for="floatingPassword">Password</label>
                        </div>

                        <button class="w-100 btn btn-lg btn-primary" type="submit">Registrar</button>
                        <button class="w-100 btn btn-lg btn-success mt-2" @click="retornarLogin">Login</button>
                        <p class="mt-2 mb-3 text-muted text-center">&copy; 2023 - Guilherme Vesentini</p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

interface UsuariosCadastrados {
    [username: string]: boolean;
}

const usuariosCadastrados: UsuariosCadastrados = reactive({});

interface User {
    username: string;
    email: string;
}

const mapUsers = (users: User[]) => {
    const mappedUsers = users.map((user: User) => {
        return {
            name: user.username,
            email: user.email
        }
    })
    return mappedUsers;
}

const getUsers = async () => {
    const req = await fetch("http://localhost:3001/users");
    const response = await req.json();
    const mappedUsers = mapUsers(response);
    mappedUsers.forEach(user => {
        usuariosCadastrados[user.name] = true;
    });
};

onMounted(() => {
    getUsers();
});

const username = ref('');
const password = ref('');
const route = useRouter();

const submit = async () => {
    if (Object.prototype.hasOwnProperty.call(usuariosCadastrados, username.value)) {
        alert('Usuário já cadastrado')
        return;
    }

    // Gerar token aleatório
    const tokenBytes = new Uint8Array(16);
    crypto.getRandomValues(tokenBytes);
    const token = Array.from(tokenBytes, b => b.toString(16).padStart(2, '0')).join('');

    // Gerar id aleatório
    const idBytes = new Uint8Array(16);
    crypto.getRandomValues(idBytes);
    const id = Array.from(idBytes, b => b.toString(16).padStart(2, '0')).join('');

    const user = {
        username: username.value,
        password: password.value,
        token: token,
        _id: id
    };


    const dataJson = JSON.stringify(user);
    const req = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });

    //const res = await req.json();

    if (req.ok) {
        route.push('/dashboard');
    }
};

const retornarLogin = (() => {
    router.push('/login');
})

</script>

<style scoped>
.form-signin {
    width: 380px;
}

.form-signin .form-floating {
    margin: 10px 0;
}

.registrar_usuario .row {
    height: 100vh;
}

.registrar_usuario .registrar_form {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.registrar_usuario .registrar_img {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;

}

.registrar_usuario .registrar_img img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 550px;
    opacity: 0.8;
}
</style>