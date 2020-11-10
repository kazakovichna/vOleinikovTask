<template>
  <div class="history">
    <div class="app-page">

      <div>
        <div class="page-title">
          <h3>История записей</h3>
        </div>

        <div class="history-chart">
          <canvas></canvas>
        </div>

        <loader v-if="loading"/>

        <p class="center" v-else-if="!records.length">
          Записей пока нет.
          <router-link to="/record">Добавьте первую</router-link>
        </p>

        <section v-else>
          <HistoryTable :records="records" />
          <Paginate
            :page-count="20"
            :click-handler="pageChangeHandler"
            :prev-text="'Назад'"
            :next-text="'Вперед'"
            :container-class="'pagination'"
            :page-class="'waves-effect'"
          />
        </section>
      </div>

    </div>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'History',
  components: {
    HistoryTable
  },
  data: () => ({
    loading: true,
    records: [],
    categories: []
  }),
  methods: {
    pageChangeHandler () {}
  },
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords')
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход'
      }
    })
    this.loading = false
  }
}
</script>

<style scoped>

</style>
