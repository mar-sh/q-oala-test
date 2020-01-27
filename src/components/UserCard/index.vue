<template>
  <div class="card">
    <div class="card-avatar">
      <img src="https://picsum.photos/200" alt="picsum" />
    </div>
    <div class="card-bio">Mr. John Doe 61</div>

    <div class="card-location">Seattle, USA, 111234</div>

    <div class="card-contact">john@doe.com</div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {},
};
</script>

<style scoped>
.card {
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
}
.card-avatar {
  align-self: center;
  grid-area: avatar;
}

.card-bio {
  grid-area: bio;
}

.card-location {
  grid-area: location;
}

.card-contact {
  grid-area: contact;
}
</style>
