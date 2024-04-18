package br.edu.puccampinas.bestbuylist

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query

@Dao
interface ItemDao {
    @Query("SELECT * FROM item")
    fun getAll(): List<Item>

    @Query("SELECT * FROM item WHERE id IN (:itemsIds)")
    fun loadAllByIds(itemsIds: IntArray): List<Item>

    @Query("SELECT * FROM item WHERE description LIKE :description")
    fun findByDescription(description: String): Item

    @Insert
    fun insertAll(vararg items: Item)

    @Insert
    fun insert(item: Item)

    @Delete
    fun delete(item: Item)
}