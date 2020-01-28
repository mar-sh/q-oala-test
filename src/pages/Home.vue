<template>
  <div>
    <header>
      <div class="logo">
        QOALA-TEST
      </div>

      <div class="buttons">
        <base-button text="Color" @click="sortByColor" />
        <base-button text="Cities" @click="sortByCity" />
      </div>
    </header>
    <div id="home">
      <div id="scroll-container">
        <div class="card-container" v-for="user in users" :key="user.email">
          <user-card :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

import BaseButton from '@/components/BaseButton';
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
    UserCard,
  },

  created() {
    this.onCreatedGetRandomUsers();
  },

  mounted() {
    const scrollContainer = document.querySelector('#scroll-container');
    this.scrollListener = scrollContainer.addEventListener('scroll', evt => {
      const maxScrollLeft = evt.target.scrollWidth - evt.target.clientWidth;

      if (evt.target.scrollLeft === maxScrollLeft) {
        const usersData = getLocalStorageItem('_usersData');
        const maxLength = usersData.length;

        if (this.pageIndex * 10 < maxLength && !this.isLoading) {
          this.pageIndex += 1;
          localStorage.setItem('_index', String(this.pageIndex));

          const dataToAppend = usersData.slice(
            this.users.length,
            this.pageIndex * 10,
          );

          this.users = [...this.users, ...dataToAppend];
        }
      }
    });
  },

  destroyed() {
    const scrollContainer = document.querySelector('#scroll-container');
    scrollContainer.removeEventListener('scroll', this.scrollListener);
  },

  data() {
    return {
      users: [],
      isLoading: false,
      errorMessage: '',
      pageIndex: parseInt(localStorage.getItem('_index'), 10) || 1,
      scrollListener: null,
    };
  },

  methods: {
    async onCreatedGetRandomUsers() {
      try {
        const usersData = getLocalStorageItem('_usersData');

        if (!usersData) {
          const response = await getRandomUsers();
          if (response.error) throw new Error(response.error);

          let { results } = response;

          results = results.map(el =>
            getAttributesShown(el, [
              'name',
              'location',
              'picture',
              'dob',
              'email',
            ]),
          );

          this.users = results.slice(0, 10);

          writeToLocalStorage('_usersData', results);
        }
        this.users = usersData.slice(0, this.pageIndex * 10);
      } catch (error) {
        if (error.message) {
          this.errorMessage = error.message;
        } else
          this.errorMessage = `Something's wrong. Reload the page or try again later.`;
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
    },
  },

  computed: {
    isError() {
      return Boolean(this.errorMessage);
    },
  },

  watch: {},
};
</script>

<style scoped>
#home {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

header {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
}

header .logo {
  font-size: 36px;
  font-weight: bold;
  cursor: default;
}

header .buttons {
  align-self: center;
  display: flex;
}

header .buttons > button {
  background-color: #ff803a;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 20px;
  text-transform: uppercase;
  cursor: pointer;
}

header .buttons > button:hover {
  background-color: #ffaa36;
}

header .buttons > button:focus {
  outline: none;
}

header .buttons > button:first-child {
  margin-right: 10px;
}

#scroll-container {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.card-container {
  padding: 15px;
}

@media (min-width: 780px) {
  #home {
    padding: 10px 50px;
  }

  #scroll-container {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    padding: 5px;
  }
}
</style>
