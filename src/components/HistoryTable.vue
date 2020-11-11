<template>
  <div class="history-table">
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{ 'History_amount' | localize }}</th>
        <th>{{ 'History_date' | localize }}</th>
        <th>{{ 'History_category' | localize }}</th>
        <th>{{ 'History_type' | localize}}</th>
        <th>{{ 'History_open' | localize }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount | currency('RUB') }}</td>
        <td>{{ record.date | date('datetime') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge"
                :class="[record.typeClass]"
          >{{ record.typeText }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Show record'"
            class="btn-small btn"
            @click="$router.push('/detail/' + record.id)"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>

</style>
