<template>

  <div class="k-table">
    <table>
      <thead>
        <tr>
          <th v-for="(header,index) in headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,index) in rows" :key="index">
          <td v-for="(cell,cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>
<script>

  export default {
    name: 'KTable',
    props: {
      headers: {
        type: Array,
        required: true,
      },
      rows: {
        type: Array,
        required: true,
      },
    },
  };

</script>
<style scoped>
.k-table{
    margin:20px;
    border-collapse:collapse;
}
.k-table table{
    width:100%;
    border:2px solid #ccc;
    border-collapse:separate;
    border-spacing:0;
}
.k-table th, .k-table td{
    padding: 10px;
    text-align:left;
    
}
</style>