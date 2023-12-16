<template>
    <div class="row" style="margin: 10px 0;">
        <div class="col-md-12">
            <MenuSuperiorAcoes name="Calendário" :btnCriarNovoEvento="true" @clickCriarNovoEvento="handleCriarNovoEvento" />
        </div>

        <div class="col-md-12">
            <div class="calendar" ref="calendarRef"></div>
        </div>
    </div>

    <div class="modal modal-mask" v-show="modalShow" transition="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Cadastro</h5>
                    <button type="button" class="btn-close" @click="modalShow = false"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Título:</label>
                            <input class="form-control" type="text" placeholder="Digite o título" v-model="eventFromCalendar.title"/>
                        </div>
                        <div class="col-md-12">
                            <div class="input_form col-md-12">
                                <label>Início:</label>
                                <input class="form-control" type="date" v-model="eventFromCalendar.start"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input_form col-md-12">
                                <label>Fim:</label>
                                <input class="form-control" type="date" v-model="eventFromCalendar.end"/>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="input_form col-md-12">
                                <input type="checkbox" id="duracao" v-model="eventFromCalendar.allDay" />
                                <label for="duracao" style="margin-left: 5px;">Durante todo o dia</label>
                            </div>
                        </div>
                        <div class="input_form col-md-12">
                            <label>Observação:</label>
                            <textarea name="observacao" rows="6" style="width: 100%; max-height: 100px;" placeholder="Digite sua observação"
                                v-model="eventFromCalendar.comments"></textarea>
                        </div>
                    </div>

                </div>
                <div class="modal-footer"  style="display: flex; justify-content: space-between;">
                    <div>
                        <button type="button" class="btn btn-secondary" @click="modalShow = false">Fechar</button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger" @click="excluirEvento">Excluir</button>
                        <button type="button" class="btn btn-primary" @click="salvarEvento" style="margin-left: 10px;">Salvar</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>

    <div class="modal modal-mask" v-show="modalCriarShow" transition="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Criar Evento</h5>
                <button type="button" class="btn-close" @click="modalCriarShow = false"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <label>Título:</label>
                        <input class="form-control" type="text" placeholder="Digite o título" v-model="eventParams.title"/>
                    </div>
                    <div class="col-md-12">
                        <div class="input_form col-md-12">
                            <input type="checkbox" id="duracao" v-model="eventParams.periodo" />
                            <label for="duracao" style="margin-left: 5px;">Por período</label>
                        </div>
                    </div>
                    <div class="col-md-12" v-if="!eventParams.periodo">
                        <div class="input_form col-md-12">
                            <label>Data:</label>
                            <input class="form-control" type="date" v-model="eventParams.date"/>
                        </div>
                    </div> 
                    <div class="col-md-12" v-if="eventParams.periodo">
                        <div class="input_form col-md-12">
                            <label>Início:</label>
                            <input class="form-control" type="date" v-model="eventParams.start"/>
                        </div>
                    </div>                    
                    <div class="col-md-12" v-if="eventParams.periodo">
                        <div class="input_form col-md-12">
                            <label>Fim:</label>
                            <input class="form-control" type="date" v-model="eventParams.end"/>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="input_form col-md-12">
                            <input type="checkbox" id="duracao" v-model="eventParams.allDay" />
                            <label for="duracao" style="margin-left: 5px;">Durante todo o dia</label>
                        </div>
                    </div>
                    <div class="input_form col-md-6" v-if="!eventParams.allDay">
                        <label for="inicioHour" style="margin-right: 5px;">Início: </label>
                        <input type="time" id="inicioHour" v-model="eventParams.hourStart" />
                    </div>
                    <div class="input_form col-md-6" v-if="!eventParams.allDay">
                        <label for="fimHour" style="margin-right: 5px;">Fim:</label>
                        <input type="time" id="fimHour" v-model="eventParams.hourEnd" />
                    </div>
                    <div class="input_form col-md-12">
                        <label>Observação:</label>
                        <textarea name="observacao" rows="6" style="width: 100%; max-height: 100px;" placeholder="Digite sua observação"
                            v-model="eventParams.comments"></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer"  style="display: flex; justify-content: space-between;">
                <div>
                    <button type="button" class="btn btn-secondary" @click="modalCriarShow = false">Fechar</button>
                </div>
                <div>
                    <button type="button" class="btn btn-danger" @click="excluirEvento">Excluir</button>
                    <button type="button" class="btn btn-primary" @click="criarEvento" style="margin-left: 10px;">Salvar</button>
                </div>                    
            </div>
        </div>
    </div>
</div>

</template>
  
<script lang="ts" setup>
import MenuSuperiorAcoes from '@/components/shared/MenuSuperiorAcoes.vue'
import { onMounted, ref } from 'vue';

import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
//import pt from '@fullcalendar/core/locales/pt';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import useGerarId from '@/composables/shared/useCriarRandomId';
import { IGerarId } from '@/composables/types';

let calendar: unknown = Calendar;
let modalShow = ref(false);
let modalCriarShow = ref(false);
const calendarRef = ref(null);
const eventos = ref<IEvento[]>([]);

let eventFromCalendar = ref({
    id: '',
    title: '',
    periodo: '',
    start: '',
    end: '',
    hourStart: '',
    hourEnd: '',
    allDay: false,
    extendedProps: {
        editable: true
    },
    editable: true,
    comments: ''
});

const config: IGerarId = {
    quantidade: 16,
    tipo: 'string'
}

interface IEvento {
    id: string;
    title: string;
    periodo: boolean;
    date: Date;
    start: Date;
    end: Date;
    hourStart: Date;
    hourEnd: Date;
    allDay: boolean;
    extendedProps: {
        editable: boolean;
    };
    editable: boolean;
    comments: string;
}

const eventParams = ref<IEvento>({
    id: '',
    title: '',
    periodo: false,
    date: new Date(),
    start: new Date(),
    end: new Date(),
    hourStart: new Date(),
    hourEnd: new Date(),
    allDay: false,
    extendedProps: {
        editable: true,
    },
    editable: true,
    comments: '',
});

const handleCriarNovoEvento = async () => {
    limparParams()
    modalCriarShow.value = true   
}

const limparParams = () => {
    eventParams.value.id = '';
    eventParams.value.title = '';
    eventParams.value.periodo = false;
    eventParams.value.date = new Date();
    eventParams.value.start = new Date();
    eventParams.value.end = new Date();
    eventParams.value.hourStart = '';
    eventParams.value.hourEnd = '';
    eventParams.value.allDay = false;
    eventParams.value.extendedProps.editable = true;
    eventParams.value.editable = true;
    eventParams.value.comments = '';
};

const criarEvento = async () => {
    const startDateTime = new Date(eventParams.value.date);
    const endDateTime = new Date(eventParams.value.date);

    const newEvent: IEvento = {
        id: useGerarId(config),
        title: eventParams.value.title,
        date: eventParams.value.date,
        periodo: eventParams.value.periodo,
        start: eventParams.value.start,
        end: eventParams.value.end,
        hourStart: eventParams.value.hourStart,
        hourEnd: eventParams.value.hourEnd,
        allDay: eventParams.value.allDay,
        extendedProps: {
            editable: true,
        },
        editable: true,
        comments: eventParams.value.comments,
    };

    if (!eventParams.value.allDay) {
        if (!eventParams.value.hourStart || !eventParams.value.hourEnd) {
            alert('necessário preencher os horários')
            return
        }
        const dateParts = eventParams.value.date.split('-');
        startDateTime.setFullYear(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));

        const hourStartParts = eventParams.value.hourStart.split(':');
        startDateTime.setHours(parseInt(hourStartParts[0]), parseInt(hourStartParts[1]), 0, 0);

        const hourEndParts = eventParams.value.hourEnd.split(':');
        endDateTime.setFullYear(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        endDateTime.setHours(parseInt(hourEndParts[0]), parseInt(hourEndParts[1]), 0, 0);

        newEvent.start = startDateTime.toISOString();
        
        if(eventParams.value.periodo) {
            // Add one day to endDateTime
            endDateTime.setDate(endDateTime.getDate() + 1);
        }
        
        newEvent.end = endDateTime.toISOString();
    }

    const dataJson = JSON.stringify(newEvent);

    const req = await fetch(`http://localhost:3001/calendarEvents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataJson,
    });

    if (req.ok) {
        eventos.value.push(newEvent);
        calendar.refetchEvents();
    } else {
        console.error('Erro ao salvar evento');
    }
};




const salvarEvento = async () => {
    const id = eventFromCalendar.value.id;

    const req = await fetch(`http://localhost:3001/calendarEvents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventFromCalendar.value),
    });

    if (req.ok) {
        // Update the events array in place
        const indexToUpdate = eventos.value.findIndex(event => event.id === id);
        if (indexToUpdate !== -1) {
            eventos.value[indexToUpdate] = eventFromCalendar.value;
        }

        // Render the updated events on the calendar
        calendar.refetchEvents();

        // Close the modal after saving
        modalShow.value = false;
    } else {
        alert('erro');
    }
};

const excluirEvento = async () => {
    const id = eventFromCalendar.value.id;

    const req = await fetch(`http://localhost:3001/calendarEvents/${id}`, {
        method: "DELETE",
    });

    if (req.ok) {
        // Remove the deleted event from the eventos array
        eventos.value = eventos.value.filter(event => event.id !== id);

        // Render the updated events on the calendar
        calendar.refetchEvents();

        // Close the modal after deleting
        modalShow.value = false;
    }
}

const handleEventClick = (info) => {
    eventFromCalendar.value.id = info.event.id
    eventFromCalendar.value.title = info.event.title
    eventFromCalendar.value.start = info.event.startStr
    eventFromCalendar.value.end = info.event.endStr
    eventFromCalendar.value.allDay = info.event.allDay
    eventFromCalendar.value.comments = info.event.extendedProps.comments
    
    modalShow.value = true
};

const criarNovoEvento = async (event: unknown) => {
    //criar novo ao selecionar as datas
    const novoId = useGerarId(config);

    const newEvent = {
        id: novoId,
        title: 'Novo Evento',
        start: event.startStr,
        end: event.endStr,
        allDay: true,
        extendedProps: {
            editable: true
        },
        editable: true
    };

    const dataJson = JSON.stringify(newEvent);

    const req = await fetch(`http://localhost:3001/calendarEvents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataJson,
    });

    if (req.ok) {
        eventos.value.push(newEvent);
        calendar.refetchEvents()
    } else {
        console.error("Erro ao salvar evento");
    }
}

const updateEvent = async (eventToUpdate) => {
    const id = eventToUpdate.event.id;

    const updatedEvent = {
        id: eventToUpdate.event.id,
        title: eventToUpdate.event.title,
        start: eventToUpdate.event.start,
        end: eventToUpdate.event.end,
        allDay: eventToUpdate.event.allDay,
        // Add other properties as needed
    };

    const req = await fetch(`http://localhost:3001/calendarEvents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
    });

    if (req.ok) {
        // Update the events array in place
        const indexToUpdate = eventos.value.findIndex(event => event.id === id);
        if (indexToUpdate !== -1) {
            eventos.value[indexToUpdate] = updatedEvent;
        }

        // Render the updated events on the calendar
        calendar.refetchEvents();

        // Close the modal after saving
        modalShow.value = false;
    } else {
        alert('erro');
    }
};

const calendarOptions = {
    // locale: pt,
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    //dateClick: handleDateClick,
    eventClick: handleEventClick,
    selectable: true,
    select: criarNovoEvento,
    events: eventos,
    eventDrop: updateEvent,
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    eventResize: updateEvent
};

const obterEventos = async () => {
    const url = 'http://localhost:3001/calendarEvents'

    const response = await fetch(url);
    if (response.ok) {
        eventos.value = []; // Clear existing data

        const data = await response.json();
        eventos.value.push(...data);

        // Remove the rendering code from here

        return data; // Return the fetched data
    } else {
        console.error("Erro ao buscar eventos");
    }
}

onMounted(async () => {
    const fetchedData = await obterEventos();
    
    const calendarEl = calendarRef.value;

    calendar = new Calendar(calendarEl, {
        ...calendarOptions,
        events: async () => {
            await fetchedData; // Wait for data to be fetched
            return eventos.value; // Use the fetched data
        }
    });

    // Call render only after calendar is initialized
    calendar.render();
});


</script>
  
<style lang="scss" scoped>
@import '@/scss/calendar.scss';
@import '@/scss/daygrid.scss';
.calendar {
    padding-bottom: 1rem;
}
</style>
  