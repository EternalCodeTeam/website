<template>
  <div
    class="text-center text-gray-500 dark:text-gray-400"
    data-aos="fade-up"
    :data-aos-duration="`${index * 100 + 300}`">
    <NuxtImg
      class="mx-auto mb-4 w-36 h-36 rounded-full"
      :src="member.avatar_url"
      :alt="`${member.name} Avatar`"
      :title="member.name" />

    <h3
      class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <p>{{ member.name }}</p>
    </h3>

    <p v-for="(role, roleIndex) in member.team_roles.data" :key="roleIndex">
      {{ role.attributes.name }}
    </p>

    <ul class="flex justify-center mt-4 space-x-4">
      <li v-if="member.github">
        <a
          :href="member.github"
          class="transition duration-500 hover:text-gray-900 dark:hover:text-white">
          <Icon name="ph:github-logo-fill" />
        </a>
      </li>

      <li v-if="member.linkedin">
        <a
          :href="member.linkedin"
          class="transition duration-500 hover:text-gray-900 dark:hover:text-white">
          <Icon name="akar-icons:linkedin-fill" />
        </a>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
interface Role {
  attributes: {
    name: string;
  };
}

interface Member {
  avatar_url: string;
  name: string;
  team_roles: {
    data: Role[];
  };
  github?: string;
  linkedin?: string;
}

interface Props {
  member: Member;
  index: Number;
}

export default defineComponent({
  props: {
    member: {
      type: Object as PropType<Member>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props: Props) {
    const memberRoles = computed(() => props.member.team_roles.data);

    return {
      memberRoles
    };
  },
});
</script>