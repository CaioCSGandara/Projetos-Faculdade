package br.edu.puccampinas.bestbuylist

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.CheckBox
import android.widget.ImageView
import androidx.appcompat.widget.AppCompatTextView
import androidx.recyclerview.widget.RecyclerView

class AdapterListItem(
        private val items: ArrayList<Item>,
        private val listener: OnDeleteItem
    ) :
    RecyclerView.Adapter<AdapterListItem.ItemViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AdapterListItem.ItemViewHolder {
        val itemView = LayoutInflater.from(parent.context).inflate(R.layout.buy_list_item, parent, false)
        return ItemViewHolder(itemView)
    }

    override fun onBindViewHolder(holder: AdapterListItem.ItemViewHolder,
                                  position: Int) {
        val currentItem = items[position]
        holder.ckCheckItem.isChecked = currentItem.checked
        holder.tvItemDescription.text = currentItem.description
    }

    override fun getItemCount(): Int {
        return items.size
    }

    inner class ItemViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView){
        val ckCheckItem: CheckBox = itemView.findViewById(R.id.ckCheckItem)
        val tvItemDescription: AppCompatTextView = itemView.findViewById(R.id.tvItemDescription)
        val ivDeleteItem: ImageView = itemView.findViewById(R.id.ivDeleteItem)

        init {
            // quando clicar no botão, lançar outro listener para remover o item.
            ivDeleteItem.setOnClickListener {
                listener.delete(items[adapterPosition])
            }
        }

    }

}