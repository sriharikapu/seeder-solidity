pragma solidity ^0.4.18;
import "@aragon/os/contracts/apps/AragonApp.sol";

/**
 * A generic registry app.
 *
 * The registry has three simple operations: `add`, `remove` and `get`.
 *
 * The registry itself is useless, but in combination with other apps to govern
 * the rules for who can add and remove entries in the registry, it becomes
 * a powerful building block (examples are token-curated registries and stake machines).
 */
contract RegistryApp is AragonApp {
    // The entries in the registry.
    mapping(bytes32 => bytes32) entries;

    // Fired when an entry is added to the registry.
    event EntryAdded(bytes32 id);
    // Fired when an entry is removed from the registry.
    event EntryRemoved(bytes32 id);

    /**
     * Add an entry to the registry.
     * @param _data The entry to add to the registry
     */
    function add(
        bytes32 _data
    ) public returns (bytes32 _id) {
        _id = keccak256(_data);
        entries[_id] = _data;

        EntryAdded(_id);
    }

    /**
     * Remove an entry from the registry.
     * @param _id The ID of the entry to remove
     */
    function remove(
        bytes32 _id
    ) public {
        delete entries[_id];
        EntryRemoved(_id);
    }

    /**
     * Get an entry from the registry.
     * @param _id The ID of the entry to get
     */
    function get(
        bytes32 _id
    ) public constant returns (bytes32) {
        return entries[_id];
    }
}
