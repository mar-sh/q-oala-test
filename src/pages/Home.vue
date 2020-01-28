<template>
  <div id="home">
    <header>
      <div>
        QOALA-TEST
      </div>

      <div>
        <base-button text="Color" @click="sortByColor" />
        <base-button text="City" @click="sortByCity" />
      </div>
    </header>

    <div id="container">
      <div class="card-container" v-for="user in users" :key="user.email">
        <user-card :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';

import { getRandomUsers } from '@/services/randomUser';
import {
  getAttributesShown,
  getLocalStorageItem,
  writeToLocalStorage,
} from '@/helpers';

export default {
  name: 'Home',
  components: {
    BaseButton,
    Header,
    UserCard,
  },

  created() {
    this.onCreatedGetRandomUsers();
  },

  mounted() {},

  destroyed() {},

  data() {
    return {
      users: [],
    };
  },

  methods: {
    logInfo() {
      console.log('click');
    },

    async onCreatedGetRandomUsers() {
      try {
        const data = getLocalStorageItem('_usersData');

        this.users = data;
        if (!data) {
          const response = await getRandomUsers();
          if (response.error) throw new Error(response.error);

          const { results } = response;

          this.users = results.map(el =>
            getAttributesShown(el, [
              'name',
              'location',
              'picture',
              'dob',
              'email',
            ]),
          );

          writeToLocalStorage('_usersData', this.users);
        }
      } catch (error) {
        console.error(error.message);
      }
    },

    sortByColor() {
      const redUsers = this.users.filter(
        user => parseInt(user.dob.age, 10) <= 21,
      );
      const greenUsers = this.users.filter(
        user =>
          parseInt(user.dob.age, 10) > 21 && parseInt(user.dob.age, 10) < 56,
      );
      const blueUsers = this.users.filter(
        user => parseInt(user.dob.age, 10) >= 56,
      );

      const results = [...greenUsers, ...blueUsers, ...redUsers];

      this.users = results;

      writeToLocalStorage('_usersData', this.users);
    },

    sortByCity() {
      const results = this.users.sort((userA, userB) => {
        const { city: cityA } = userA.location;
        const { city: cityB } = userB.location;

        if (cityA < cityB) {
          return 1;
        } else if (cityA > cityB) {
          return -1;
        } else return 0;
      });

      this.users = results;

      writeToLocalStorage('_usersData', this.users);
    },
  },

  computed: {},

  watch: {},
};
</script>

<style scoped>
#home {
  min-width: 100%;
  display: flex;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
}

#container {
  min-width: 100%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 10px;
}

.card-container {
  padding: 15px;
}
</style>
