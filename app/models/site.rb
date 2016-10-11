class Site < Carto
  COLUMNS = [:intname, :country, :hyperlink, :sitrecid]

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
      WHERE intname IS NOT NULL
      ORDER BY #{order_column}
    )
  end

  def self.order_column
    "intname"
  end

  def self.table_name
    "critical_sites"
  end
end
