<template>
    <div class="card" style="min-height: 100%;">
        <div class="card-header">
            Lembretes
        </div>
        <div class="card-body">
            <ul style="list-style: none; padding-left: 0">
                <li v-for="evento in eventosHoje" v-bind:key="evento"
                    style="background-color: #319dd344;padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                    <span v-if="evento.allDay">Todo o dia: </span>
                    <span v-if="!evento.allDay">{{ evento.hourStart }} - {{ evento.hourEnd }}: </span>
                    {{ evento.title }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const listaDeEventos = ref<any[]>([]);

const getEventos = async () => {
  try {
    const req = await fetch(`http://localhost:3001/calendarEvents`);
    const response = await req.json();

    if (response) {
      listaDeEventos.value = response;
    }
  } catch (error) {
    console.error('Error fetching eventos:', error);
  }
};

const eventosHoje = computed(() => {
  const eventos = listaDeEventos.value;
  const hoje = new Date();
  const formattedDate = `${hoje.getFullYear()}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getDate().toString().padStart(2, '0')}`;

  const eventosToday = eventos.filter(evento => {
  const eventDate = new Date(evento.start);
  const formattedEventDate = `${eventDate.getFullYear()}/${(eventDate.getMonth() + 1).toString().padStart(2, '0')}/${eventDate.getDate().toString().padStart(2, '0')}`;
  return formattedEventDate === formattedDate;
});
  
  return eventosToday
})

onMounted(() => {
    getEventos(); 
})
</script>
  
<style lang="scss" scoped></style>
  
  