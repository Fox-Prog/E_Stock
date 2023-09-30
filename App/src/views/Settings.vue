<template>
  <v-app-bar
    app
    style="background: linear-gradient(to top right, #212121, #263238)"
    location="bottom"
  >
    <!-- Btn done -->
    <template v-slot:append>
      <Btn_done @click="router.push('/')"></Btn_done>
    </template>
  </v-app-bar>

  <div class="img_font">
    <img :src="imgPath" alt="background_img" />
  </div>

  <!-- Language selector -->
  <div class="lg-form">
    <v-form>
      <div style="display: flex">
        <v-select
          v-model="language"
          prepend-icon="mdi-translate"
          variant="outlined"
          :items="lgs"
          @update:model-value="setLang(language)"
        ></v-select>

        <img id="flag" :src="flag" alt="flag" />
      </div>
    </v-form>

    <!-- Set pattern -->
    <div class="pattern-form">
      <v-divider class="my-5"></v-divider>
      <v-select
          class="my-2"
          v-model="pattern"
          prepend-icon="mdi-format-paint"
          variant="outlined"
          label="Pattern"
          :items="patterns"
          @update:model-value="setPattern(pattern)"
      ></v-select>
    </div>


    <!-- Email form -->
    <div class="email-form">
      <v-divider class="my-5"></v-divider>
      <div id="title-contact-form">
        <h3>{{ t.h3_titleContactForm }}</h3>
        <div v-if="sendDone" class="sendRes" id="send-done">
          <h4>{{ t.mailDone }}</h4>
          <v-icon icon="mdi-check" />
        </div>
        <div v-if="sendError" class="sendRes" id="send-error">
          <h4>{{ t.mailError }}</h4>
          <v-icon icon="mdi-alert-circle-outline" />
        </div>
      </div>
      <v-form v-model="form">
        <!-- Name -->
        <v-text-field
          class="mb-2"
          v-model="name"
          prepend-icon="mdi-account"
          clearable
          variant="outlined"
          :label="t.labelName"
          :rules="[required]"
        ></v-text-field>

        <!-- Email -->
        <v-text-field
          class="mb-2"
          v-model="email"
          type="email"
          prepend-icon="mdi-at"
          clearable
          variant="outlined"
          :label="t.labelEmail"
          :rules="[required, isEmail]"
        ></v-text-field>

        <!-- Objet -->
        <v-select
          class="mb-2"
          v-model="object"
          prepend-icon="mdi-text-short"
          variant="outlined"
          :label="t.objectEmail"
          :items="objects"
        ></v-select>

        <!-- Content -->
        <v-textarea
          class="mb-2"
          v-model="content"
          variant="outlined"
          :label="t.labelMailArea"
          :rules="[required]"
        ></v-textarea>

        <!-- Submit -->
        <v-btn variant="tonal" block :disabled="!form" @click="sendMail">{{
          t.sendMail
        }}</v-btn>
      </v-form>
    </div>
  </div>
</template>












<script setup>
import Btn_done from "@/components/bigBTN/done.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { getTranslate } from '@/multilanguage/lang.js' 
const t = getTranslate()

import { useRouter } from "vue-router";
const router = useRouter();

const imgPath = "/images/cog.jpg";

// Language
import { getLangsNames, setLang, getFlag } from '@/multilanguage/lang.js'

const language = ref(localStorage.getItem('lang'));
const lgs = ref(getLangsNames())
const flag = ref(getFlag(language.value))


// Email form
import emailjs from "emailjs-com";

const form = ref(false);
const name = ref(null);
const email = ref(null);
const objects = [
  t.objects.bug,
  t.objects.feedback,
  t.objects.other,
];
const object = ref(objects[0]);
const content = ref(null);

const sendDone = ref(false);
const sendError = ref(false);

// Check input fields
function required(v) {
  return !!v || t.requireMsg;
}

function isEmail(v) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(v)) {
    return t.isNotEmail;
  }
  return true;
}

function sendMail() {
  let translateObject;

  if (object === objects[0]) {
    translateObject = "Problème";
  } else if (object === objects[1]) {
    translateObject = "Retour d'expérience";
  } else if (object === objects[2]) {
    translateObject = "Autre";
  }

  try {
    emailjs.send(
      "service_knj3pa6",
      "template_opfkckr",
      {
        object: translateObject,
        name: name.value,
        content: content,
        email: email.value,
      },
      "s6Y1Al8q1MCbFJVSJ"
    );

    sendDone.value = true;
    name.value = null;
    email.value = null;
    content = null;
    
  } catch (error) {
    console.log(error);
    sendError.value = true;
  }
}


// Set patterns

import { getPatternsNames, setPattern } from '@/assets/patterns.js'

const patterns = ref(getPatternsNames()) // Select choice
const pattern = ref(localStorage.getItem('patternName'))

</script>












<style>
.img_font {
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 40vh;
  overflow: hidden;

  z-index: 1;
}

.lg-form {
  position: relative;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 20vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 5vh;
  border-radius: 20px;
  background: linear-gradient(to bottom left, #616161, #bdbdbd, #616161);
  box-shadow: 0px 0px 30px 0px rgb(0, 0, 0, 0.2);
  z-index: 2;
}

#flag {
  position: absolute;
  width: 60px;
  height: 60px;
  right: -30px;
  top: -30px;
}

.email-form {
  display: block;
}
#title-contact-form {
  margin-bottom: 20px;
  text-align: center;
}

.sendRes {
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  border-radius: 5px;
}

#send-done {
  background: linear-gradient(to top right, #17650c, #33c31a);
}
#send-done h4 {
  margin-right: 10px;
}

#send-error {
  background: linear-gradient(to top right, #ac3705, #e30909);
}
#send-error h4 {
  margin-right: 10px;
}
</style>
