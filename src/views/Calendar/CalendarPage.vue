<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes name="Calendário" :adicionar="true" />
        </div>

        <div class="col-md-12">

            <button @click="open = true">Open Modal</button>

            <Teleport to="body">
            <div v-if="open" class="modal">
                <p>Hello from the modal!</p>
                <button @click="open = false">Close</button>
            </div>
            </Teleport>

            <br>
            <br>

            <div class="calendar" ref="calendarRef"></div>
        </div>
    </div>

    <ModalEvent modalId="modalCalendario" title='teste' @clickSalvar="criarCadastro" />

</template>
  
<script lang="ts" setup>
import MenuSuperiorAcoes from '@/components/shared/MenuSuperiorAcoes.vue'
import { onMounted, ref } from 'vue';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import pt from '@fullcalendar/core/locales/pt';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ModalEvent from '@/components/shared/ModalEvent.vue';

let open = ref(false)

let calendar; // Defina a variável calendar fora da função onMounted
let modalShow = ref(false)
const calendarRef = ref(null);

const handleDateClick = (info) => {
    alert('hey: ' + info.dateStr)
    console.log(info);
    
}

const openModal = () => {
    const modal = document.getElementById('myModal');
    modalShow.value = true;
};
const closeModal = () => {
    const modal = document.getElementById('myModal');
};

const handleEventClick = (info) => {
    if (info.event.extendedProps.editable) {
        // Aqui você pode implementar a lógica para abrir um formulário de edição
        // ou qualquer ação que deseja realizar quando um evento é clicado para edição
        //alert('Editar evento: ' + info.event.title);
        openModal
    }
};

const eventos = [
    {
        title: 'Evento 1',
        start: '2023-08-15',
        end: '2023-08-16'
    },
    {
        title: 'Evento Editável',
        start: '2023-08-15',
        end: '2023-08-16',
        select: true,
        editable: true, // Torna o evento editável
        extendedProps: {
            // Você pode adicionar propriedades adicionais ao evento
            // para controlar sua interação ou lógica
            editable: true
        }
    }
]


const calendarOptions = {
    locale: pt,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    dateClick: handleDateClick,
    eventClick: openModal,
    selectable: true,
    events: eventos,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    }
};

onMounted(() => {
    const calendarEl = calendarRef.value;
    calendar = new Calendar(calendarEl, calendarOptions);
    calendar.render();
});

</script>
  
<style lang="scss" scoped>
.calendar {
    padding-bottom: 1rem;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
  