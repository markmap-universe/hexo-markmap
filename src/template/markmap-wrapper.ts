export default (
  root: string,
  jsonOptions: string,
  id?: string,
  height?: string,
) =>
    /* html */`
    <div class="markmap-wrap" 
      ${id ? `id="${id}"` : ''}
      ${height ? `style="height: ${height}"` : ''}
    >
      <script type="application/json">${root}</script>
      <script type="application/json">${jsonOptions}</script>
    </div>
    `
