export const formatRupiah = (rupiah) => {
    return `Rp. ${Intl.NumberFormat("id-id").format(rupiah)}`;

  }