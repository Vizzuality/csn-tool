class Country < Carto
  COLUMNS = [:country, :country_id, :iso3]

  attr_reader *COLUMNS

  def initialize(hsh)
    COLUMNS.each do |col|
      instance_variable_set("@#{col.to_s}", hsh[col.to_s])
    end
  end

  private

  def self.where_query field, value
    %Q(
      SELECT DISTINCT #{columns.join(", ")}
      FROM #{table_name}
      WHERE #{field} ilike '#{value}%'
      ORDER BY #{order_column}
    )
  end

  def self.list_query
    %Q(
      SELECT DISTINCT #{columns.join(", ")}
      FROM #{table_name}
      ORDER BY #{order_column}
    )
  end

  def self.order_column
    "country"
  end

  def self.table_name
    "critical_sites"
  end
end
