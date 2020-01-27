<template>
  <div id="home">
    <header>
      <div>
        QOALA-TEST
      </div>

      <div>
        <base-button text="Color" />
        <base-button text="City" />
      </div>
    </header>

    <div id="container">
      <user-card />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import Header from '@/components/Header';
import UserCard from '@/components/UserCard';

import { getRandomUsers } from '@/services/randomUser';
import { getAttributesShown } from '@/helpers';

export default {
  name: 'Home',
  components: {
    BaseButton,
    Header,
    UserCard,
  },

  created() {
    const onCreatedGetRandomUsers = async () => {
      try {
        const response = await getRandomUsers();
        const { results } = response;

        this.randomUsers = results.map(el =>
          getAttributesShown(el, ['name', 'location', 'picture', 'dob']),
        );
      } catch (e) {}
    };
    onCreatedGetRandomUsers();
  },

  mounted() {},

  destroyed() {},

  data() {
    return {
      randomUsers: [],
    };
  },

  methods: {
    logInfo() {
      console.log('click');
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
</style>
